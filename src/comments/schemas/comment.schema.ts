
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";
import { UserClass } from "src/users/user.class.ts/user.class";


export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {

    @Prop({ type: Object })
    userID: UserClass

    @Prop()
    songID: string

    @Prop({ default: true })
    IsAction: boolean


    @Prop()
    content: string

    @Prop()
    ghimSecond: number

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;

}


export const CommentSchema = SchemaFactory.createForClass(Comment);