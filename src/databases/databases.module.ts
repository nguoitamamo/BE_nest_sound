import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { DatabasesController } from './databases.controller.js';
import { DatabasesService } from './databases.service.js';
import { UsersService } from '../users/users.service.js';
import { User, UserSchema } from '../users/schemas/user.schema.js';
import { Permission, PermissionSchema } from '../permissions/schemas/permission.schema.js';
import { Role, RoleSchema } from '../roles/schemas/role.schema.js';

@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService, UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ])
  ],

})
export class DatabasesModule { }
