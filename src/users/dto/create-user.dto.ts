import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

import { IsUniqueConstraint } from 'src/validator/is.unique.constraint';



export class CreateUserDto {

    @Validate(IsUniqueConstraint, [{ schema: 'user', column: 'email' }])
    @IsEmail()
    @IsNotEmpty({ message: 'email khong duoc de trong', })
    email: string;

    @IsNotEmpty({ message: 'password khong duoc de trong', })
    password: string;

    @Validate(IsUniqueConstraint, [{ schema: 'user', column: 'name' }])
    @IsNotEmpty({ message: 'name khong duoc de trong', })
    name: string;


}
