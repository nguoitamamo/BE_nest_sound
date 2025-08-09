import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"
import { Permission } from "../../permissions/schemas/permission.schema.js";


export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
    @Prop()
    name: string
    @Prop({ default: '' })
    description: string
    @Prop({ default: true })
    isActive: boolean

    @Prop({ type: [{ type: Types.ObjectId, ref: Permission.name }], default: [] })
    permissions: Types.ObjectId[];


    @Prop()
    money: string

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

export const RoleSchema = SchemaFactory.createForClass(Role);
export const RoleModel = mongoose.model('Role', RoleSchema);