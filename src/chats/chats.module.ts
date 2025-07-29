import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsController } from './chats.controller.js';
import { ChatsService } from './chats.service.js';
import { ChatGateway } from './chats.gateway.js';
import { Chat, ChatSchema } from './schemas/chat.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }])],
  controllers: [ChatsController],
  providers: [ChatsService, ChatGateway],
  exports: [ChatsService]
})
export class ChatsModule { }
