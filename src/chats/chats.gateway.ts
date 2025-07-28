
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'

import { Server, Socket } from 'socket.io'

import { ClientToServerEvents, Message, MessageType, ReadAllMessagePayload, ServerToClientEvents, UserSocket } from 'src/global/global.interface'

import { ChatsService } from './chats.service'

import { Types } from 'mongoose'




@WebSocketGateway({
    cors: {
        origin: ['http://localhost:4000'],
        credentials: true,
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private chatService: ChatsService
    ) { }

    @WebSocketServer() server: Server = new Server<ServerToClientEvents, ClientToServerEvents>()

    private logger = new Logger('ChatGateway')
    private onlineUsers: string[] = []


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
            console.log('>>> check online', this.onlineUsers);
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

    //       socket.on("send-new-message", (message) => {
    //     message.chat.users.forEach((user) => {
    //       io.to(user._id).emit("new-message-received", message);
    //     });
    //     console.log(message);
    //   });


    @SubscribeMessage('send-new-message')
    async handleSendMessage(
        @MessageBody()
        payload: {
            message: MessageType
        }
    ) {
        payload.message.chat.users.forEach((user) => {
            this.server.to(user._id).emit("new-message-received", payload.message);

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

        console.log("đã xem hết");

        this.chatService.UpdateUserAllReadAndLastMessage(payload.chatId, payload.readByUserId)
        // payload.users.forEach((user) => {

        //     this.server.to(user).emit("user-read-all-chat-messages", {
        //         chatId: payload.chatId,
        //         readByUserId: payload.readByUserId,
        //     });
        // });
    }

    // @SubscribeMessage('typing')
    // async handleTyping(
    //     @MessageBody() payload: ReadAllMessagePayload
    // ) {
    //     payload.users.forEach((user) => {
    //         this.server.to(user).emit("typing", {
    //             chatId: payload.chatId,
    //             readByUserId: payload.readByUserId,
    //         });
    //     });
    // }




    afterInit(server: Server) {
        console.log('Socket server initialized');
    }

    async handleConnection(socket: Socket): Promise<void> {
        this.logger.log(`Socket connected: ${socket.id}`)
    }

    async handleDisconnect(socket: Socket): Promise<void> {

        this.logger.log(`Socket disconnected: ${socket.id}`)
    }
}
