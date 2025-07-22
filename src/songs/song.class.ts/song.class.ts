import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class SongClassgClass {

    @Prop()
    name: string;
    @Prop()
    coverURL: string;
    @Prop()
    users: string[];
}