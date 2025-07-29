import { Module } from '@nestjs/common';


import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema.js';
import { PlaylistsController } from './playlists.controller.js';
import { PlaylistsService } from './playlists.service.js';


@Module({
  imports: [MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService]
})
export class PlaylistsModule { }
