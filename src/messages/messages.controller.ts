import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { ResponseMessage, User } from '../decorators/customiz.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateMessageDto } from './dto/update-message.dto.js';



@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @ResponseMessage('create new message')
  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @User() user: IUser) {
    return this.messagesService.create(createMessageDto, user);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @ResponseMessage('get messages của đoạn chat theo id')
  @Get('chat') // id của đoạn chat
  findOne(
    @Query('chatID') chatID: string,
    @User() user: IUser) {
    return this.messagesService.findOne(chatID, user);
  }


  @ResponseMessage('get all messages ')
  @Get('all') // id của đoạn chat
  findAllMessages(
    @Query('chatID') chatID: string,
    @User() user: IUser) {
    return this.messagesService.findAllMessages(chatID, user);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
