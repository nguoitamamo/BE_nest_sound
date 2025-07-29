import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Album, AlbumDocument } from './schema/album.schema.js';
import { IUser } from '../users/users.interface.js';
import { CreateAlbumDto } from './dto/create-album.dto.js';
import { UpdateAlbumDto } from './dto/update-album.dto.js';



@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: SoftDeleteModel<AlbumDocument>,

  ) { }




  async create(createAlbumDto: CreateAlbumDto, user: IUser) {


    return await this.albumModel.create({
      name: createAlbumDto.name,
      description: createAlbumDto?.description,
      createBy: {
        _id: user._id,
        name: user.name
      }
    })
  }

  findAll() {
    return `This action returns all albums`;
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
