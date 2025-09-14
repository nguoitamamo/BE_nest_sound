import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, Logger } from '@nestjs/common';


import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service.js';
import { Public, ResponseMessage, User } from '../decorators/customiz.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { IUser } from './users.interface.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Cron, CronExpression } from '@nestjs/schedule';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.usersService.create(createUserDto, file);
  }


  @ResponseMessage('nâng cấp vip')
  @Patch('vip')
  handleUpdateVip(
    @Query('vip') vip: string,
    @Query('id') id: string, //vip name
    @User() user: IUser
  ) {
    return this.usersService.handleUpdateVipAdmin(user, id, vip)
  }

  @Public()
  @ResponseMessage('get all user')
  @Get('all')
  getAllUser() {
    return this.usersService.getAll()
  }



  @ResponseMessage('user following creater')
  @Patch('follower/:id') // id của creater
  handleFollwing(@Param('id') id: string, @User() user: IUser) { // truyền _id của người được follwing
    return this.usersService.handleFollwing(id, user);
  }



  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @ResponseMessage('get user theo id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }


  @Patch('friend/:id')
  handleSubmitFriend(
    @Param('id') id: string,// id của người được add friend
    @User() user: IUser
  ) {
    return this.usersService.handleSubmitFriend(id, user)
  }

  // @SubscribeMessage('events')
  // handleEvent(@ConnectedSocket() client: Socket, @MessageBody() data: any): string {
  //   console.log(client.data);
  //   // logs the id of the client
  //   const message: string = data.message;
  //   return message;
  // }


  @Get('album/:id')
  handleGetAlbum(
    @Param('id') id: string
  ) {
    return this.usersService.handleGetAlbumByUser(id);
  }





}
