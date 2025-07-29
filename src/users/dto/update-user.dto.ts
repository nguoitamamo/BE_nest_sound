import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
    _id: string
}
