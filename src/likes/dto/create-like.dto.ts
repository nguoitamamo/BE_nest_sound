import { IsBoolean, IsString } from "class-validator";

export class CreateLikeDto {
    
    @IsString({message: '_id song là chuỗi'})
    _id: string

    @IsBoolean({message: 'true/false'})
    status: boolean


}
