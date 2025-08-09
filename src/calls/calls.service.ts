import { Injectable } from '@nestjs/common';
import { CreateCallDto } from './dto/create-call.dto.js';
import { UpdateCallDto } from './dto/update-call.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Call, CallDocument } from './shemas/call.schema.js';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from '../users/users.interface.js';
import { Types } from 'mongoose';


@Injectable()
export class CallsService {

  constructor(
    @InjectModel(Call.name) private callModel: SoftDeleteModel<CallDocument>,
  ) { }

  async create(createCallDto: CreateCallDto, user: IUser) {
    return this.callModel.create({
      callID: createCallDto.callID,
      adminID: new Types.ObjectId(user._id)
    })
  }

  async findAll() {
    return await this.callModel.find()
      .select('_id callID adminID')
      .populate({
        path: 'adminID',
        select: '_id name avatar'
      });
  }


  findOne(id: number) {
    return `This action returns a #${id} call`;
  }

  update(id: number, updateCallDto: UpdateCallDto) {
    return `This action updates a #${id} call`;
  }

  remove(id: number) {
    return `This action removes a #${id} call`;
  }
}
