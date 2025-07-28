import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateChatDto {


    @IsNotEmpty()
    @IsArray()
    users: Types.ObjectId[]

    @IsNotEmpty()
    @IsBoolean()
    isGroupChat: boolean

}
