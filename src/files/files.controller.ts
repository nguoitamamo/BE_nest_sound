import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { FilesService } from './files.service';
import { Public, ResponseMessage } from 'src/decorators/customiz';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }
   
    @Post('upload/image')
    @ResponseMessage('upload image')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: '.(png|jpeg|jpg)'
            })
            .addMaxSizeValidator({
                maxSize: 1024 * 1024
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    )
    file: Express.Multer.File) {

        return {
            fileName: file.filename
        };
    }

   
    @Post('upload/audio')
    @ResponseMessage('upload audio')
    @UseInterceptors(FileInterceptor('file'))
    uploadAudio(
        @UploadedFile(
            new ParseFilePipeBuilder()
                // .addFileTypeValidator({
                //     fileType: /^audio\/mpeg$/, // MIME type for mp3
                // })
                .addMaxSizeValidator({
                    maxSize: 10 * 1024 * 1024, // 10MB
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        file: Express.Multer.File,
    ) {
        return {
            fileName: file.filename
        };
    }



}
