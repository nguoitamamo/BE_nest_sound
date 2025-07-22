import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateGenreDto {

    @IsNotEmpty({ message: 'name không được để trống', })
    @IsString({ message: 'name phải là chuỗi' })
    name: string;

    @IsOptional()
    @IsString({ message: 'message là chuỗi string' })
    descriptions?: string;
}
