import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument, Types } from 'mongoose';
import { UserClass } from 'src/users/user.class.ts/user.class';
import { StateEnum } from '../state.enumts/state.enum';
import { ISong } from '../song.interface.ts/song.interface';



export type SongDocument = HydratedDocument<Song>;
// export const UserInfoSchema = SchemaFactory.createForClass(CreateUserDto);
// export const GenreInfoShema = SchemaFactory.createForClass(CreateGenreDto);
@Schema({ timestamps: true })
export class Song {


    @Prop({ unique: true })
    name: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    users: string[]

    @Prop()
    audio: string;

    @Prop()
    cover: string;

    @Prop({
        type: String,
        enum: StateEnum,
        default: StateEnum.ACTION,
    })
    state: StateEnum;


    @Prop()
    genres: string[];

    @Prop()
    albumID: string;

    @Prop()
    isVip: boolean;

    @Prop([{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now }
    }])
    totalListen: {
        _id: mongoose.Types.ObjectId;
        date: Date;
    }[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    like: string[]

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    dislike: string[]


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
        email: string;
    }


    @Prop({ type: Types.ObjectId, ref: 'User' })
    updateBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }
    @Prop({ type: Types.ObjectId, ref: 'User' })
    deleteBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }
}

export const SongSchema = SchemaFactory.createForClass(Song);