import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private prermissionModel: SoftDeleteModel<PermissionDocument>,

  ) { }


  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    return await this.prermissionModel.create({
      name: createPermissionDto.name,
      apiPath: createPermissionDto.apiPath,
      method: createPermissionDto.method,
      module: createPermissionDto.module,
      createBy: {
        _id: user._id,
        name: user.name
      }
    })
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
