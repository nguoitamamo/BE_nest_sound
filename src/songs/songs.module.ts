import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './schemas/song.schema';
import { UsersModule } from 'src/users/users.module';
import { GenresModule } from 'src/genres/genres.module';




@Module({
  imports: [MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]), UsersModule, GenresModule],
  controllers: [SongsController],
  providers: [SongsService,],
  exports: [SongsService,]
})
export class SongsModule { }
