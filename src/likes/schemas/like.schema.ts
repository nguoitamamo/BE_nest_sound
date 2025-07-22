import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";
import { UserClass } from "src/users/user.class.ts/user.class";


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