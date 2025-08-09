

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"
import { Permission } from "../../permissions/schemas/permission.schema.js";


export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {

    @Prop()
    id: string;

    @Prop({ type: { type: Types.ObjectId, ref: 'User' } })
    user: Types.ObjectId;

    @Prop({ default: Date.now })
    date: Date

    @Prop({ default: '' })
    account_number: string;

    @Prop({ default: '' })
    transaction_content: string


    @Prop({ default: '' })
    bank_brand_name: string


    @Prop()
    transaction_date: string



}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
export const PaymentModel = mongoose.model('Payment', PaymentSchema);