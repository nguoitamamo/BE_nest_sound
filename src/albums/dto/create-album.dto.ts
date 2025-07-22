import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateAlbumDto {

    @IsNotEmpty({ message: 'name album không được trống' })
    @IsString({ message: 'name album là chuỗi' })
    name: string;

    @IsString()
    @IsOptional()
    description?: string


}
