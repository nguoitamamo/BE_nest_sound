import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';



@Injectable()
export class CommentsService {

  constructor(@InjectModel(Comment.name) private commentModel: SoftDeleteModel<CommentDocument>) { }


  async create(createCommentDto: CreateCommentDto, user: IUser) {
    return await this.commentModel.create({
      userID: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar
      },
      songID: createCommentDto.songID,
      content: createCommentDto.content,
      ghimSecond: createCommentDto.ghimSecond

    })
  }

  async findAll() {
    return await this.commentModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return await this.commentModel.find({ songID: id }).sort({ createdAt: -1 })
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
