import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumsService } from './albums.service.js';
import { User } from '../decorators/customiz.js';
import { CreateAlbumDto } from './dto/create-album.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateAlbumDto } from './dto/update-album.dto.js';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) { }


  @Post()

  create(@Body() createAlbumDto: CreateAlbumDto, @User() user: IUser) {
    return this.albumsService.create(createAlbumDto, user);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(+id);
  }
}
