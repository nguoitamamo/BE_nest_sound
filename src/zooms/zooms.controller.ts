import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ZoomsService } from './zooms.service.js';
import { CreateZoomDto } from './dto/create-zoom.dto.js';
import { UpdateZoomDto } from './dto/update-zoom.dto.js';
import { Public, ResponseMessage, User } from '../decorators/customiz.js';
import { IUser } from '../users/users.interface.js';



@Controller('zooms')
export class ZoomsController {
  constructor(private readonly zoomsService: ZoomsService) { }


  @ResponseMessage('create zoom')
  @Post()
  create(
    @Body() createZoomDto: CreateZoomDto,
    @User() user: IUser
  ) {
    return this.zoomsService.create(createZoomDto, user);
  }

  @ResponseMessage('add user zoom')
  @Patch('add-user') // id của user
  handleAddUserZoom(
    @User() user: IUser,
    @Query('chatID') chatID: string
  ) {
    return this.zoomsService.handleAddUserToZoom(user, chatID)
  }

  @Public()
  @ResponseMessage('get all zoom')
  @Get()
  findAll() {
    return this.zoomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zoomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZoomDto: UpdateZoomDto) {
    return this.zoomsService.update(+id, updateZoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zoomsService.remove(+id);
  }
}
