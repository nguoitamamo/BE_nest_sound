
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose";
import { UserClass } from "../../users/user.class.ts/user.class.js";



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
export const CommentModel = mongoose.model('Comment', CommentSchema);