import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateZoomDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    adminID: string;

    @IsNotEmpty()
    @IsArray()
    users: Types.ObjectId[]




}
