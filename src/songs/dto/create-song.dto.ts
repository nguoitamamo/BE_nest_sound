import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Validate, ValidateNested, Validator } from 'class-validator';
import { IsUniqueConstraint } from '../../validator/is.unique.constraint.js';
import { StateEnum } from '../state.enumts/state.enum.js';


export class CreateSongDto {

    // @IsString()
    // @ObjectExists()
    // readonly id: string;
    @IsOptional()
    @IsString({ message: '_id là string' })
    _id?: string


    @Validate(IsUniqueConstraint, [{ schema: 'song', column: 'name' }])
    @IsNotEmpty({ message: 'name không được để trống', })
    name: string;



    // @IsArray({ message: 'genres phải là một mảng' })
    // @ValidateNested({ each: true }) // <- validate từng phần tử
    // @Type(() => CreateGenreDto) // <- chuyển từng phần tử thành DTO
    // genres: CreateGenreDto[];


    // @IsArray({ message: 'usersID phải là một mảng' })
    // @ValidateNested({ each: true }) // <- validate từng phần tử
    // @Type(() => CreateGenreDto) // <- chuyển từng phần tử thành DTO
    // usersID: CreateGenreDto[];

    @IsNotEmpty({ message: 'tác giả không được để trống ', })
    @IsArray({ message: 'users là mảng' })
    users: string[];

    @IsNotEmpty({ message: 'thể loại không được để trống ', })
    @IsArray({ message: 'genres là mảng' })
    genres: string[];

    @IsNotEmpty({ message: 'audio không được để trống ', })
    @IsString({ message: 'audio name là string' })
    audio: string;

    @IsNotEmpty({ message: 'ảnh bìa không được để trống ', })
    @IsString({ message: 'cover name là string' })
    cover: string;

    @IsOptional()
    @IsArray({ message: ' like là mảng' })
    like: string[];

    @IsOptional()
    @IsArray({ message: 'dislike là mảng' })
    dislike: string[];


    @IsOptional()
    @IsEnum(StateEnum)
    state: StateEnum;




    @IsOptional()
    @IsBoolean()
    isVip: boolean;


    @IsOptional()
    @IsString()
    albumID: string;

}
