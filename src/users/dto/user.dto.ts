import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {


    @IsNotEmpty({ message: 'name khong duoc de trong', })
    name: string;

    @IsOptional()
    avatar: string;



}
