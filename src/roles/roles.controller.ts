import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service.js';
import { Public, ResponseMessage, User } from '../decorators/customiz.js';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';


@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @ResponseMessage('create role')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @User() user: IUser) {
    return this.rolesService.create(createRoleDto, user);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }



  @Public()
  @Get('permissions')
  @ResponseMessage("get permission by role")
  findOne(@Body('ids') ids: string[]) {
    return this.rolesService.getPermissions(ids);
  }



  @ResponseMessage("update role")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @User() user: IUser) {
    return this.rolesService.update(id, updateRoleDto, user);
  }
  @ResponseMessage('delete role')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser): Promise<any> {
    return this.rolesService.removeRole(id, user);
  }
}
