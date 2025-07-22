import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CommentDocument, Comment } from './schemas/comment.schema';
import { IUser } from 'src/users/users.interface';


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
