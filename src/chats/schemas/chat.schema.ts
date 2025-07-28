import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

import { Message } from "src/messages/schemas/message.schema";
import { User } from "src/users/schemas/user.schema";



export type ChatDocument = HydratedDocument<Chat>;



@Schema({ timestamps: true })
export class Chat {

    @Prop({ type: [{ type: Types.ObjectId, ref: User.name, required: true }] })
    users: Types.ObjectId[];

    @Prop([
        {
            userID: { type: Types.ObjectId, ref: User.name, required: true },
            messageID: { type: Types.ObjectId, ref: Message.name, required: true },
        },
    ])
    unreadCounts: {
        userID: Types.ObjectId,
        messageID: Types.ObjectId
    }[];

    @Prop({ default: '' })
    lastMessageAt: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Message.name })
    lastMessage: Types.ObjectId;


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    createdBy: Types.ObjectId;

    @Prop({
        type: Boolean,
        default: false,
    })
    isGroupChat: boolean

    @Prop({
        type: String,
        default: "",
    })
    groupName: string

    @Prop({
        type: String,
        default: "",
    })
    groupProfilePicture: string

    @Prop({
        type: String,
        default: "",
    })
    groupBio: string

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: User.name
    })
    groupAdmins: Types.ObjectId[]


    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;


}
export const ChatSchema = SchemaFactory.createForClass(Chat);

