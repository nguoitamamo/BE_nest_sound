import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChatsService } from './chats.service.js';
import { Public, ResponseMessage, User } from '../decorators/customiz.js';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }


  @ResponseMessage('create new chat')
  @Post()
  create(@Body() createChatDto: CreateChatDto, @User() user: IUser) {
    return this.chatsService.create(createChatDto, user);
  }


  @Patch('addUser')
  handleAddUser(
    @Body('UserID') UserID: string,
    @Body('ChatID') ChatID: string
  ) {
    return this.chatsService.handleUpdateUserChat(UserID, ChatID)
  }

  // @Get()
  // findAll() {
  //   return this.chatsService.findAll();
  // }

  @ResponseMessage('đoạn chats của user ')
  @Get() // id user
  findOne(@User() user: IUser) {
    return this.chatsService.findOne(user);
  }

  @ResponseMessage('đoạn chat của user với user ')
  @Get('user') // id đoạn chat
  findOneChat(
    @Body('chatID') chatID: string,
    @Body('userID') userID: string,
    @User() user: IUser) {
    return this.chatsService.findOneChatWithUser(chatID, userID, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }





}
