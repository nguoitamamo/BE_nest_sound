import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import { Song } from "src/songs/schemas/song.schema";


export type HistoryDocument = HydratedDocument<History>;

@Schema({ timestamps: true })
export class History {

    @Prop()
    userID: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: Song.name, required: true }] })
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
export const HistorySchema = SchemaFactory.createForClass(History);