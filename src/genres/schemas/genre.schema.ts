import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;


@Schema({ timestamps: true })
export class Genre {

    @Prop({ unique: true })
    name: string;

    @Prop()
    descriptions: string;

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

export const GenreSchema = SchemaFactory.createForClass(Genre);