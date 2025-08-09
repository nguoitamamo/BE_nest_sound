
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";




export type ZoomDocument = HydratedDocument<Zoom>;

@Schema({ timestamps: true })
export class Zoom {



    @Prop()
    name: string;


    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    adminID: Types.ObjectId;


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    })
    chat: Types.ObjectId


    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;


}
export const ZoomSchema = SchemaFactory.createForClass(Zoom);
export const ZoomModel = mongoose.model('Zoom', ZoomSchema);