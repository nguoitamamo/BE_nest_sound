import { IsNotEmpty, IsString } from "class-validator";

export class CreateCallDto {

    @IsString()
    @IsNotEmpty()
    callID: string

}
