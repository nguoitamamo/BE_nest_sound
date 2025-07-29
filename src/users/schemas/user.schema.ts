import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema({ timestamps: true })
export class User {


  @Prop({ unique: true })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;


  @Prop()
  avatar: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }], default: [] })
  following: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }], default: [] })
  followers: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }], default: [] })
  role: Types.ObjectId[];


  @Prop({ type: [{ type: Types.ObjectId, ref: 'Song' }] })
  shared: Types.ObjectId[]

  @Prop()
  refreshToken: string;

  @Prop({ default: 'SYSTEM' })
  typeLogin: string;

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
  @Prop()
  socketId: string

}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = mongoose.model('User', UserSchema);