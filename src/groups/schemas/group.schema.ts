import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/schemas/user.schema";




export type GroupDocument = HydratedDocument<Group>;

@Schema({ timestamps: true })
export class Group {



    @Prop()
    name: string;

    @Prop()
    avatar: string;


    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    adminGroup: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: User.name, required: true }] })
    members: Types.ObjectId[];

    @Prop({ default: 5 })
    limitUser: number;

    @Prop({ default: true })
    IsActive: boolean

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createBy: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    }


    @Prop({ type: Types.ObjectId, ref: 'User' })
    updateBy: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    }
    @Prop({ type: Types.ObjectId, ref: 'User' })
    deleteBy: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    }


}
export const GroupSchema = SchemaFactory.createForClass(Group);