import { INTERCEPTORS_METADATA } from "@nestjs/common/constants"


export interface IBody {
    type: string,
    username: string
}

export interface UserSocket {
    _id: string
    name: string
    socketId: string,
    avatar: string
}


export interface Room {
    name: string
    host: UserSocket
    users: UserSocket[]
}

export interface Message {
    user: UserSocket
    timeSent: string
    message: string
    roomName: string
}

export interface ServerToClientEvents {
    chat: (e: Message) => void
}

export interface ClientToServerEvents {
    chat: (e: Message) => void
    join_room: (e: { user: UserSocket; roomName: string }) => void
}



export interface MessageType {
    _id: string;
    socketMessageId: string;
    chat: ChatType;
    sender: UserType;
    text: string;
    image: string;
    readBy: string[];
    createdAt: string;
    updatedAt: string;
}

interface UserType {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}


export interface ChatType {
    _id: string;
    users: UserType[];
    createdBy: UserType;
    lastMessage: MessageType;
    isGroupChat: boolean;
    groupName: string;
    groupProfilePicture: string;
    groupBio: string;
    groupAdmins: UserType[];
    unreadCounts: any;
    createdAt: string;
    updatedAt: string;
}
export interface ReadAllMessagePayload {
  chatId: string;
  users: string[];
  readByUserId: string;
}

