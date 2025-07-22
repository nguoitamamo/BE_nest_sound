import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class UserClass {

    _id: string;

    name: string;

    avatar: string;

}