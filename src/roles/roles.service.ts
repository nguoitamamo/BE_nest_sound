import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import mongoose from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema.js';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';

@Injectable()
export class RolesService {

  constructor(
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
  ) { }

  async create(createRoleDto: CreateRoleDto, user: IUser) {
    return await this.roleModel.create({
      name: createRoleDto.name,
      description: createRoleDto?.description,
      isActive: createRoleDto?.isActive,
      permissions: createRoleDto?.permissions
    })
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOneByNameRole(vip: string) {
    return (await this.roleModel.findOne({ name: vip }))._id;
  }


  async getPermissions(ids: string[]) {
    return await this.roleModel.find({ _id: { $in: ids } }).populate({
      path: 'permissions',
      select: '_id apiPath method description'
    });

  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {

    if (!mongoose.Types.ObjectId.isValid(id))
      return `not fount role`;

    return await this.roleModel.updateOne(
      { _id: id }, // ← filter
      {
        $set: {
          ...updateRoleDto,
          updateBy: {
            _id: user._id,
            name: user.name
          }
        }
      }
    );
  }


  async removeRole(id: string, user: IUser): Promise<any> {

    if (!mongoose.Types.ObjectId.isValid(id))
      return `not fount role`;


    return await this.roleModel.deleteOne({ _id: id })
  }
}
