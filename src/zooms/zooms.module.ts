import { Module } from '@nestjs/common';
import { ZoomsController } from './zooms.controller.js';
import { ZoomsService } from './zooms.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Zoom, ZoomSchema } from './schemas/zoom.schema.js';
import { Chat, ChatSchema } from '../chats/schemas/chat.schema.js';

import { Role, RoleSchema } from '../roles/schemas/role.schema.js';
import { User, UserSchema } from '../users/schemas/user.schema.js';
import { ChatsService } from '../chats/chats.service.js';
import { UsersService } from '../users/users.service.js';
import { RolesService } from '../roles/roles.service.js';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Zoom.name, schema: ZoomSchema },
    { name: Chat.name, schema: ChatSchema },
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema },

  ])],
  controllers: [ZoomsController],
  providers: [ZoomsService, ChatsService, UsersService, RolesService]
})
export class ZoomsModule { }
