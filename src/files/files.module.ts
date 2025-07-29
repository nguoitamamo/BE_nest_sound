import { Module } from '@nestjs/common';

import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer.config.js';
import { FilesController } from './files.controller.js';
import { FilesService } from './files.service.js';


@Module({
  imports: [
    MulterModule.registerAsync({
    useClass: MulterConfigService
    ,
  })],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule { }
