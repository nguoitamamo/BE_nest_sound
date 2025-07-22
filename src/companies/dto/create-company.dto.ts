import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {

    @IsNotEmpty({ message: 'address khong duoc de trong', })
    address: string;

    @IsNotEmpty({ message: 'mo ta khong duoc de trong', })
    decsription: string;

    @IsNotEmpty({ message: 'name khong duoc de trong', })
    name: string;


}
