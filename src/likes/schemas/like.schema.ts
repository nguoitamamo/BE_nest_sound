import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose";
import { UserClass } from "../../users/user.class.ts/user.class.js";



export type LikeDocument = HydratedDocument<Like>;

@Schema({ timestamps: true })
export class Like {

    @Prop({ type: Object })
    userID: UserClass

    @Prop()
    songID: string

    @Prop()
    status: boolean

}


export const LikeSchema = SchemaFactory.createForClass(Like);
export const LikeModel = mongoose.model('Like', LikeSchema);