import { PartialType } from '@nestjs/mapped-types';
import { CreateWhisperDto } from './create-whisper.dto.js';


export class UpdateWhisperDto extends PartialType(CreateWhisperDto) { }
