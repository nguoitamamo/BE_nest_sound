import { Module } from '@nestjs/common';
import { WhisperService } from './whisper.service.js';
import { WhisperController } from './whisper.controller.js';


@Module({
  controllers: [WhisperController],
  providers: [WhisperService],
  exports: [WhisperService]
})
export class WhisperModule { }
