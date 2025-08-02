import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Genre, GenreDocument } from './schemas/genre.schema.js';
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { UpdateGenreDto } from './dto/update-genre.dto.js';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) private genreModel: SoftDeleteModel<GenreDocument>
  ) { }
  async create(createGenreDto: CreateGenreDto) {
    return await this.genreModel.create({
      name: createGenreDto.name,
      descriptions: createGenreDto?.descriptions
    })
  }

  async checkGenerExist(genreNames: string[]): Promise<boolean> {

    for (const genreName of genreNames) {
      const genre = await this.findOneByName(genreName);
      if (!genre) return false;
    }
    return true;
  }

  findOneByName(genreName: string) {
    return this.genreModel.findOne({ name: genreName });
  }
  async findAll() {
    return this.genreModel.find().select('_id name descriptions')
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
