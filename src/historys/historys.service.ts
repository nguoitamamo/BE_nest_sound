import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { History, HistoryDocument } from './schemas/history.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { Types } from 'mongoose';

@Injectable()
export class HistorysService {
  constructor(
    @InjectModel(History.name) private historyModel: SoftDeleteModel<HistoryDocument>,
  ) { }


  async create(createHistoryDto: CreateHistoryDto, user: IUser) {


    const existing = await this.historyModel.findOne({
      userID: user._id,
      songID: createHistoryDto.songID
    });

    if (existing) {
      existing.isDeleted = false;
      existing.start = createHistoryDto?.start || existing.start;
      await existing.save();
      return existing;
    }


    return await this.historyModel.create({
      userID: user._id,
      songID: createHistoryDto.songID,
      start: createHistoryDto.start
    })

  }

  findAll() {
    return `This action returns all historys`;
  }

  async findOne(id: string) {
    return await this.historyModel.find
      (
        { userID: id, isDeleted: false }
      )
      .populate({
        path: 'songID',
        select: '_id name audio cover like dislike totalListen',
        populate: {
          path: 'users',
          select: '_id name'
        }
      }).sort({ createdAt: -1 });

  }

  update(id: string, updateHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
