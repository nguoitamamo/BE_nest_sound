import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose";


export type AlbumDocument = HydratedDocument<Album>;
@Schema({ timestamps: true })
export class Album {
    @Prop()
    name: string
    @Prop({ default: '' })
    description: string


    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;

    @Prop({ type: Object })
    createBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }
    @Prop({ type: Object })
    updateBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }
    @Prop({ type: Object })
    deleteBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

}
export const AlbumSchema = SchemaFactory.createForClass(Album);
export const AlbumModel = mongoose.model('Album', AlbumSchema);