import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';
import { Role, RoleSchema } from '../roles/schemas/role.schema.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { RolesService } from '../roles/roles.service.js';






@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),],
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  exports: [UsersService]
})
export class UsersModule { }
