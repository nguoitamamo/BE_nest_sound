import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {


    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop()
    decsription: string;

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

export const CompanySchema = SchemaFactory.createForClass(Company);