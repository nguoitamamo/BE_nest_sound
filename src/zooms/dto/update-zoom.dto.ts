import { PartialType } from '@nestjs/mapped-types';
import { CreateZoomDto } from './create-zoom.dto.js';


export class UpdateZoomDto extends PartialType(CreateZoomDto) {}
