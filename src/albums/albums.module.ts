import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schema/album.schema.js';
import { AlbumsController } from './albums.controller.js';
import { AlbumsService } from './albums.service.js';


@Module({
  imports: [MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }])],
  controllers: [AlbumsController],
  providers: [AlbumsService]
})
export class AlbumsModule { }
