import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';


import { Types } from 'mongoose';
import { Group, GroupDocument } from './schemas/group.schema.js';
import { User } from '../decorators/customiz.js';
import { Song, SongDocument } from '../songs/schemas/song.schema.js';
import { UserDocument } from '../users/schemas/user.schema.js';
import { CreateGroupDto } from './dto/create-group.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateGroupDto } from './dto/update-group.dto.js';


@Injectable()
export class GroupsService {

  constructor(
    @InjectModel(Group.name) private groupModel: SoftDeleteModel<GroupDocument>,

    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Song.name) private songModel: SoftDeleteModel<SongDocument>,

  ) { }



  async create(createGroupDto: CreateGroupDto, user: IUser) {


    return await this.groupModel.create({
      name: createGroupDto.name,
      avatar: createGroupDto.avatar,
      adminGroup: user._id,
      members: createGroupDto.members || [],
      limitUser: createGroupDto?.limitUser,
      IsActive: createGroupDto?.IsActive,
      createBy: {
        _id: user._id,
        name: user.name
      }
    })
  }

  findAll() {
    return `This action returns all groups`;
  }




  async findOne(user: IUser) {
    return await this.groupModel.find
      ({ adminGroup: user._id, IsActive: true, isDeleted: false })
      .populate('members', '_id name avatar following followers')
  }

  async addShareUser(id: string, member: Types.ObjectId[]) {

    const songVip = await this.songModel.find({ users: id, isVip: true }).select('_id');

    return await this.userModel.updateMany({
      _id: { $in: member },

    }, { $addToSet: { shared: { $each: songVip } } },
    )

  }


  async AddMenber(updateGroupDto: UpdateGroupDto, user: IUser) {

    const group = await this.groupModel.findOne({ adminGroup: updateGroupDto?.id, name: updateGroupDto.name });

    if (!group) {
      throw new BadRequestException("Group không tồn tại");
    }

    const newMemberIds = updateGroupDto.members || [];

    const currentCount = group.members?.length || 0;
    const limit = currentCount + newMemberIds.length;

    if (limit > group.limitUser) {
      throw new BadRequestException("Vượt quá số lượng thành viên cho phép trong nhóm");
    }

    newMemberIds.forEach((id) => {
      if (!group.members.includes(id)) {
        group.members.push(id);
      }
    });


    const member = newMemberIds;
    const id = updateGroupDto?.id;

    this.addShareUser(id, member)



    await group.save();
    return group.populate('members', '_id name avatar following followers')
  }




  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
