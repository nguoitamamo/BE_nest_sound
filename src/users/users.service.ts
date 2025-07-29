import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';
// import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

// const { genSaltSync, hashSync, compareSync } = pkg;


import { IUser } from './users.interface.js';
import { Role, RoleDocument } from '../roles/schemas/role.schema.js';
import { User, UserDocument } from './schemas/user.schema.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';



import pkg from 'bcryptjs';
const { genSaltSync, hashSync, compareSync } = pkg;


@Injectable()
export class UsersService {
  

  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,

  ) { }
  // room


  // room


  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    return hash;
  }

  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    const hashPassword = this.getHashPassword(createUserDto.password);


    let user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      name: createUserDto.name,

    })
    return user;
  }

  async checkUserExist(userids: string[]): Promise<boolean> {
    for (const id of userids) {
      const user = await this.userModel.findById(id);
      if (!user) return false;
    }
    return true;
  }

  async findAll() {
    return await this.userModel.find()
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not fount user`;

    const user = this.userModel.findById(id).populate('followers', '_id name email avatar followers')
    if (!user) return `not found user`;

    const userObj = (await user).toObject();
    delete userObj.password;

    return userObj;

  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email: email });


  }

  findOneByEmailSocial(email: string): Promise<IUser> {
    return this.userModel.findOne({ email: email });


  }
  isSchemaExits(column: string, value: string) {
    return this.userModel.findOne({ [column]: value })
  }

  findOneByName(name: string) {
    return this.userModel.findOne({ name: name })
  }

  isValidCheckPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: updateUserDto._id }, { ...updateUserDto });
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not fount user`;

    return this.userModel.softDelete({ _id: id });
  }


  async handleFollwing(id: string, user: IUser) {

    if (id === user._id) return 'không thể tự theo dõi chính mình'

    if (!mongoose.Types.ObjectId.isValid(id))
      return `not fount user`;

    // return await this.userModel.updateOne({ _id: id }, {
    //   $addToSet: { followers: user._id }
    // });

    const userUpdate = await this.userModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { followers: user._id },
      },
      { new: true }
    )

    return userUpdate.followers;
  }



  async handleUpdateVip(user: IUser, id: string, vip: string) {
    const vipRole = await this.roleModel.findOne({ name: vip });
    if (!vipRole) throw new Error("Role không tồn tại");

    return await this.userModel.updateOne(
      { _id: id },
      {
        $addToSet: {
          role: vipRole._id
        },
        $set: {
          updateBy: {
            _id: user._id,
            name: user.name
          }
        }
      }
    );
  }



  async getAll() {
    return this.userModel.find().select('_id name avatar email createdAt updatedAt')
  }

}
