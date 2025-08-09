
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'

import { Server, Socket } from 'socket.io'

// import { ClientToServerEvents, Message, MessageType, ReadAllMessagePayload, ServerToClientEvents, UserSocket } from ''




import { ChatsService } from './chats.service.js'
import { ClientToServerEvents, InfoCallUser, MessageType, ServerToClientEvents, SocketPapload, UserInfoUpdateRole } from '../global/global.interface.js'
import { UsersService } from '../users/users.service.js'




@WebSocketGateway({
    cors: {
        origin: ['http://localhost:4000', 'http://160.25.81.159:4000'],
        credentials: true,
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private chatService: ChatsService,
        private userService: UsersService
    ) { }

    @WebSocketServer() server: Server = new Server<ServerToClientEvents, ClientToServerEvents>()

    private logger = new Logger('ChatGateway')
    private onlineUsers: string[] = [];
    private userSocketMap: Map<string, string> = new Map();


    @SubscribeMessage('join')
    async handleSetClientDataEvent(
        @MessageBody()
        payload: {
            userID: string,
            socketId: string,
        }
    ) {
        if (payload.socketId) {
            console.log(payload);
            await this.server.in(payload.socketId).socketsJoin(payload.userID)

            if (!this.onlineUsers.includes(payload.userID)) {
                this.onlineUsers.push(payload.userID);
            }

            this.onlineUsers.forEach((user) => {
                this.server.to(user).emit("online-users-updated", this.onlineUsers);
            });
        }
    }

    @SubscribeMessage('logout')
    async handleLogoutEvent(
        @MessageBody()
        payload: {
            userID: string,
            socketId: string,
        }
    ) {
        if (payload.socketId) {
            console.log(payload);

            await this.server.in(payload.socketId).socketsLeave(payload.userID)

            this.onlineUsers = this.onlineUsers.filter((user) => user !== payload.userID);
        }
    }



    @SubscribeMessage('send-new-message')
    async handleSendMessage(
        @MessageBody()

        message: MessageType

    ) {
        message?.chat?.users.forEach((user) => {
            if (user._id !== message.sender._id)
                this.server.to(user._id).emit("new-message-received", message);
        });
    }

    @SubscribeMessage('read-all-messages')
    async handleReadAllMessage(
        @MessageBody() payload: {
            chatId: string;
            users: string[];
            readByUserId: string;
        }
    ) {


        this.chatService.UpdateUserAllReadAndLastMessage(payload.chatId, payload.readByUserId)

    }





    @SubscribeMessage('update-role')
    async handleUpdateRole(
        @MessageBody()
        payload: {
            info: UserInfoUpdateRole
        }
    ) {
        if (payload.info) {
            await this.userService.handleUpdateVipUser(
                payload.info.userId,
                payload.info.userName,
                payload.info.vipName,
            )
        }
    }


    @SubscribeMessage('call-user')
    async handleCallUser(
        @MessageBody()
        info: InfoCallUser,

    ) {
        if (info) {
            this.server.to(info.ToUserID).emit("incoming-call", info)

        }
    }


    @SubscribeMessage('reject-call')
    async handleRejectCall(
        @MessageBody()
        info: InfoCallUser,

    ) {
        if (info) {
            this.server.to(info.fromUserID).emit("reject-call-user", false)
        }
    }


    @SubscribeMessage('call-accepted')
    handleCallAccepted(@MessageBody() info: InfoCallUser) {
        this.server.to(info.fromUserID).emit('received-call-accepted', info);
    }




    // @SubscribeMessage('conn-signal')
    // handleConnSignal(
    //     @MessageBody()
    //     data: {
    //         signal: any,
    //         toUserID: string
    //     }
    // ) {
    //     console.log(data);
    //     this.server.to(data.toUserID).emit('conn-signal', data);
    // }

    ///

    @SubscribeMessage('create-new-zoom')
    async handleCreateZoom(
        @MessageBody() data: { zoomID: string; userID: string },
        @ConnectedSocket() socket: Socket
    ) {
        const { zoomID, userID } = data;
        this.userSocketMap.set(userID, socket.id);

        console.log('>> check create new Zoom');

        socket.join(zoomID); // dùng socket.join
    }


    @SubscribeMessage('join-zoom')
    async handleJoinZoom(
        @MessageBody() data: { userID: string; zoomID: string; chatID: string },
        @ConnectedSocket() socket: Socket
    ) {
        const { userID, zoomID, chatID } = data;

        console.log('>> check join zoom');

        this.userSocketMap.set(userID, socket.id); // cập nhật socket map
        socket.join(zoomID);

        const chat = await this.chatService.handleUpdateUserChat(userID, chatID);
        console.log(">>> check chat", chat)
        //@ts-ignore
        for (const user of chat) {
            const otherUserID = user._id.toString();
            if (otherUserID !== userID) {
                const otherSocketID = this.userSocketMap.get(otherUserID);
                console.log(">> check ortherSoket", otherSocketID);
                if (otherSocketID) {
                    this.server.to(otherSocketID).emit('conn-prepare', { connUserSocketId: socket.id });
                }
            }


        }
    }


    @SubscribeMessage('conn-init')
    handleConnInit(
        @MessageBody() data: { connUserSocketId: string },
        @ConnectedSocket() socket: Socket
    ) {
        console.log(">> conn-init từ user:", socket.id, "->", data.connUserSocketId);

        const { connUserSocketId } = data;
        this.server.to(connUserSocketId).emit('conn-init', {
            connUserSocketId: socket.id,
        });
    }


    @SubscribeMessage('conn-signal')
    async handleConnSignal(
        @MessageBody()
        data: { signal: any; connUserSocketId: string },
        @ConnectedSocket() socket: Socket
    ) {
        const { signal, connUserSocketId } = data;

        // Truyền dữ liệu signal sang user đích
        this.server.to(connUserSocketId).emit('conn-signal', {
            signal,
            connUserSocketId: socket.id,
        });

        console.log(`[conn-signal] Gửi từ ${socket.id} đến ${connUserSocketId}`);
    }








    ///


    @SubscribeMessage('user-payment')
    async handleUserPayment(
        @MessageBody()
        des: string,
        amount: string
    ) {

    }






    afterInit(server: Server) {
        console.log('Socket server initialized');
    }

    async handleConnection(socket: Socket): Promise<void> {
        this.logger.log(`Socket connected: ${socket.id}`)
    }

    async handleDisconnect(socket: Socket): Promise<void> {

        for (const [userID, socketID] of this.userSocketMap.entries()) {
            if (socketID === socket.id) {
                this.userSocketMap.delete(userID);
                break;
            }
        }

        console.log("🚪 User disconnected:", socket.id);
    }
}
