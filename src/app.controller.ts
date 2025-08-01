import { Controller, Get, Render, UseGuards, Post, Request, UploadedFile, UseInterceptors, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth/auth.service.js';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService
  ) { }



  // @Public()
  // @Post('upload/image')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadImage(@UploadedFile(
  //   new ParseFilePipeBuilder()
  //     .addFileTypeValidator({
  //       fileType: '.(png|jpeg|jpg)'
  //     })
  //     .addMaxSizeValidator({
  //       maxSize: 1024 * 1024
  //     })
  //     .build({
  //       errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  //     }),
  // )


  // file: Express.Multer.File) {
  //   return {
  //     file: file.buffer.toString(),
  //   };
  // }

  // @Public()
  // @Post('upload/audio')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadAudio(@UploadedFile() file: Express.Multer.File) {
  //   return this.authService.uploadToCloudinary(file, 'video');
  // }
}
