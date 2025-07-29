import { Injectable } from '@nestjs/common';


import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Like, LikeDocument } from './schemas/like.schema.js';

import { CreateLikeDto } from './dto/create-like.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateLikeDto } from './dto/update-like.dto.js';


@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: SoftDeleteModel<LikeDocument>,

  ) { }

  async create(createLikeDto: CreateLikeDto, user: IUser) {
    return await this.likeModel.create({
      userID: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar
      },
      songID: createLikeDto._id,
      status: createLikeDto.status
    })
  }

  findAll() {
    return `This action returns all likes`;
  }

  // async find(id: string, userID : string) {

  //   const conditions : a


  //   return await this.likeModel.find( { songID: id, userID._id: userID }) 
  // }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
