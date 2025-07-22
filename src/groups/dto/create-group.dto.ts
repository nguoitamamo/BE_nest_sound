import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateGroupDto {

    @IsOptional()
    @IsString()
    id: string; // id của admin group



    @IsNotEmpty({ message: 'name group không thể trống' })
    @IsString()
    name: string;


    @IsArray({ message: 'Ít nhất phải có 1 thành viên' })
    members: Types.ObjectId[];


    @IsNotEmpty({ message: 'avatar không thể trống' })
    @IsString()
    avatar: string;


    @IsBoolean()
    @IsOptional()
    IsActive: boolean


    @IsNumber()
    @IsOptional()
    limitUser: number;

}
