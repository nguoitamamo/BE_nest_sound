import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsController } from './chats.controller.js';
import { ChatsService } from './chats.service.js';
import { ChatGateway } from './chats.gateway.js';
import { Chat, ChatSchema } from './schemas/chat.schema.js';
import { User, UserSchema } from '../users/schemas/user.schema.js';
import { UsersService } from '../users/users.service.js';
import { Role, RoleSchema } from '../roles/schemas/role.schema.js';
import { RolesService } from '../roles/roles.service.js';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Chat.name, schema: ChatSchema },
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema },
  ])],
  controllers: [ChatsController],
  providers: [ChatsService, ChatGateway, UsersService, RolesService],
  exports: [ChatsService]
})
export class ChatsModule { }
