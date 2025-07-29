import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './schemas/song.schema.js';
import { UsersModule } from '../users/users.module.js';
import { GenresModule } from '../genres/genres.module.js';
import { SongsController } from './songs.controller.js';
import { SongsService } from './songs.service.js';




@Module({
  imports: [MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]), UsersModule, GenresModule],
  controllers: [SongsController],
  providers: [SongsService,],
  exports: [SongsService,]
})
export class SongsModule { }
