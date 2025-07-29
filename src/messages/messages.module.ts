import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema.js';
import { Chat, ChatSchema } from '../chats/schemas/chat.schema.js';
import { MessagesController } from './messages.controller.js';
import { MessagesService } from './messages.service.js';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Chat.name, schema: ChatSchema }
    ])],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule { }
