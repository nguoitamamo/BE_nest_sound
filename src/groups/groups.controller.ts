import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ResponseMessage, User } from 'src/decorators/customiz';
import { IUser } from 'src/users/users.interface';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @ResponseMessage('create group thành công')
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @User() user: IUser) {
    return this.groupsService.create(createGroupDto, user);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @ResponseMessage('get group by user')
  @Get('user')
  findOne(
    @User() user: IUser
  ) {
    return this.groupsService.findOne(user);
  }

  // dành cho user vippp
  @ResponseMessage('add member to group')
  @Patch('add')
  addMember(
    // @Query('name') name: string, // name group
    // @Query('id') id: string, // id admin group
    @Body() updateGroupDto: UpdateGroupDto,
    @User() user: IUser
  ) {
    return this.groupsService.AddMenber(updateGroupDto, user)
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
