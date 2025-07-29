import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenresController } from './genres.controller.js';
import { GenresService } from './genres.service.js';
import { Genre, GenreSchema } from './schemas/genre.schema.js';


@Module({
  imports: [MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }])],
  controllers: [GenresController],
  providers: [GenresService],
  exports: [GenresService]
})
export class GenresModule { }
