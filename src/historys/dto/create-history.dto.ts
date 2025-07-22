import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateHistoryDto {

    // @IsNotEmpty({ message: 'userID không được trống' })
    // @IsString({ message: 'userID là string' })
    // userID: string;

    @IsNotEmpty({ message: 'songID không được trống' })
    @IsString({ message: 'songID là string' })
    songID: string;

    @IsOptional()
    @IsNotEmpty({ message: 'start không được trống' })
    @IsNumber()
    start: number;


}
