import { PartialType } from '@nestjs/mapped-types';
import { CreateCallDto } from './create-call.dto.js';


export class UpdateCallDto extends PartialType(CreateCallDto) {}
