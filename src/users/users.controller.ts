import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorators/customiz';
import { IUser } from './users.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Room } from 'src/global/global.interface';


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
    @Query('id') id: string,
    @User() user: IUser
  ) {
    return this.usersService.handleUpdateVip(user, id, vip)
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


  // @SubscribeMessage('events')
  // handleEvent(@ConnectedSocket() client: Socket, @MessageBody() data: any): string {
  //   console.log(client.data);
  //   // logs the id of the client
  //   const message: string = data.message;
  //   return message;
  // }




}
