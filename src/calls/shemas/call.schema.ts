
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";





export type CallDocument = HydratedDocument<Call>;



@Schema({ timestamps: true })
export class Call {

    @Prop()
    callID: string;


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    adminID: Types.ObjectId;


    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;


}
export const CallSchema = SchemaFactory.createForClass(Call);
export const CallModel = mongoose.model('Call', CallSchema);
