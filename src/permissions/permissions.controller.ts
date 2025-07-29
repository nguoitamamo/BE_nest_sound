import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionsService } from './permissions.service.js';
import { ResponseMessage, User } from '../decorators/customiz.js';
import { CreatePermissionDto } from './dto/create-permission.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdatePermissionDto } from './dto/update-permission.dto.js';


@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ResponseMessage('create permission')
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto, @User() user: IUser) {
    return this.permissionsService.create(createPermissionDto, user);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
