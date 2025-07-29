import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';


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
