import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserClass } from 'src/users/user.class.ts/user.class';

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
    songID: string;

    @IsBoolean()
    @IsOptional()
    IsAction?: boolean;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNumber()
    ghimSecond: number;
}
