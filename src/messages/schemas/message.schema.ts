import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";




export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {

    @Prop({
        type: String,
        default: "",
    })
    socketMessageId: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    })
    chat: Types.ObjectId

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    sender: Types.ObjectId

    @Prop({
        type: String,
        default: "",
    })
    text: string

    @Prop({
        type: String,
        default: "",
    })
    image: string

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    })
    readBy: Types.ObjectId

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;


}
export const MessageSchema = SchemaFactory.createForClass(Message);
export const MessageModel = mongoose.model('Message', MessageSchema);