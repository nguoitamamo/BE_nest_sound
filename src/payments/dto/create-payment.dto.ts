import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePaymentDto {

    @IsOptional()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    user: string;

    @IsOptional()
    @IsString()
    account_number: string;

    @IsOptional()
    @IsString()
    transaction_content: string

    @IsOptional()
    @IsString()
    bank_brand_name: string

    @IsOptional()
    @IsString()
    transaction_date: string

}
