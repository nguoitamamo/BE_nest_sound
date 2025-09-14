import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose";
import { UserClass } from "../../users/user.class.ts/user.class.js";



export type LikeDocument = HydratedDocument<Like>;

@Schema({ timestamps: true })
export class Like {

    @Prop({ type: Object })
    userID: UserClass

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Song', required: true }] })
    songID: string

    @Prop()
    status: boolean

}


export const LikeSchema = SchemaFactory.createForClass(Like);
export const LikeModel = mongoose.model('Like', LikeSchema);