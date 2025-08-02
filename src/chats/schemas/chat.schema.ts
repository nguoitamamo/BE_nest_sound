import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";





export type ChatDocument = HydratedDocument<Chat>;



@Schema({ timestamps: true })
export class Chat {

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User', required: true }] })
    users: Types.ObjectId[];

    @Prop([
        {
            userID: { type: Types.ObjectId, ref: 'User', required: true },
            messageID: { type: Types.ObjectId, ref: 'Message', required: true },
        },
    ])
    unreadCounts: {
        userID: Types.ObjectId,
        messageID: Types.ObjectId
    }[];

    @Prop()
    lastMessageAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
    lastMessage: Types.ObjectId;


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
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
        ref: 'User'
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
export const ChatModel = mongoose.model('Chat', ChatSchema);
