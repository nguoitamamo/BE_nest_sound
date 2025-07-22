import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsNotEmpty({ message: 'songID không được trống' })
    @IsString({ message: 'songID là string' })
    songID: string;

}
