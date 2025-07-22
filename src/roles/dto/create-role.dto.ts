import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string


    @IsBoolean()
    @IsOptional()
    isActive: boolean

    @IsOptional()
    @IsArray()
    permissions: string[];
}
