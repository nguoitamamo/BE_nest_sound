import { Injectable } from '@nestjs/common';
import { CreateZoomDto } from './dto/create-zoom.dto.js';
import { UpdateZoomDto } from './dto/update-zoom.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from '../chats/schemas/chat.schema.js';
import { Zoom, ZoomDocument } from './schemas/zoom.schema.js';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from '../users/users.interface.js';
import { Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema.js';


@Injectable()
export class ZoomsService {
  constructor(
    @InjectModel(Chat.name) private chatModel: SoftDeleteModel<ChatDocument>,
    @InjectModel(Zoom.name) private zoomModel: SoftDeleteModel<ZoomDocument>,
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) { }



  async create(createZoomDto: CreateZoomDto, user: IUser) {

    const chat = await this.chatModel.create({
      users: createZoomDto.users,
      createdBy: user._id,
      isGroupChat: true
    });

    const zoom = await this.zoomModel.create({
      name: createZoomDto.name,
      adminID: new Types.ObjectId(user._id),
      chat: chat._id,
      
    })



    return await this.zoomModel.findById(zoom._id).populate({
      path: 'chat',
      populate: {
        path: 'users',
        select: "_id name avatar"
      },
      select: '_id users'
    });
  }

  async handleAddUserToZoom(user: IUser, chatID: string) {

    await this.chatModel.updateOne({ _id: chatID }, {
      $addToSet: {
        users: new Types.ObjectId(user._id)
      }
    })


  }


  async findAll() {
    return await this.zoomModel.find().populate({
      path: 'chat',
      populate: {
        path: 'users',
        select: "_id name avatar"
      },
      select: '_id users'
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} zoom`;
  }

  update(id: number, updateZoomDto: UpdateZoomDto) {
    return `This action updates a #${id} zoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} zoom`;
  }
}
