import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Album, AlbumDocument } from './schema/album.schema.js';
import { IUser } from '../users/users.interface.js';
import { CreateAlbumDto } from './dto/create-album.dto.js';
import { UpdateAlbumDto } from './dto/update-album.dto.js';
import { User, UserDocument } from '../users/schemas/user.schema.js';
import { Types } from 'mongoose';



@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: SoftDeleteModel<AlbumDocument>,

    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,

  ) { }




  async create(createAlbumDto: CreateAlbumDto, user: IUser) {


    const album = await this.albumModel.create({
      name: createAlbumDto.name,
      description: createAlbumDto?.description,
      createBy: {
        _id: user._id,
        name: user.name
      }
    })

    await this.userModel.updateOne({ _id: user._id }, {
      $addToSet: { albums: new Types.ObjectId(album._id) }
    })
    const { _id, name, description } = album;
    return { _id, name, description };

  }

  async findAll() {
    return this.albumModel.find()
  }

  async findOne(id: string) {
    return this.albumModel.find()
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
