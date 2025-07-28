import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ResponseMessage, User } from 'src/decorators/customiz';
import { IUser } from 'src/users/users.interface';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }


  @ResponseMessage('create new chat')
  @Post()
  create(@Body() createChatDto: CreateChatDto, @User() user: IUser) {
    return this.chatsService.create(createChatDto, user);
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
