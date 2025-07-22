import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from './schemas/group.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { ConfigService } from '@nestjs/config';
import { RolesService } from 'src/roles/roles.service';
import { Types } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Song, SongDocument } from 'src/songs/schemas/song.schema';

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
