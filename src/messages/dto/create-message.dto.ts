import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
    @IsOptional()
    @IsString()
    text: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsString()
    chat: string;

    @IsOptional()
    @IsArray()
    readBy?: string[];

    @IsOptional()
    socketMessageId: string;
}
