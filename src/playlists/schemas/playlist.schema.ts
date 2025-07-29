import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";




export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ timestamps: true })
export class Playlist {

    @Prop()
    userID: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Song', required: true }] })
    songID: Types.ObjectId;

    @Prop()
    start: number;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;


}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
export const PlaylistModel = mongoose.model('Playlist', PlaylistSchema);