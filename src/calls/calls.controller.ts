import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallsService } from './calls.service.js';
import { CreateCallDto } from './dto/create-call.dto.js';
import { UpdateCallDto } from './dto/update-call.dto.js';
import { Public, ResponseMessage, User } from '../decorators/customiz.js';
import { IUser } from '../users/users.interface.js';



@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) { }


  @ResponseMessage('create call')
  @Post()
  create(@Body() createCallDto: CreateCallDto, @User() user: IUser) {
    return this.callsService.create(createCallDto, user);
  }

  @Public()
  @ResponseMessage('get all calls')
  @Get()
  findAll() {
    return this.callsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCallDto: UpdateCallDto) {
    return this.callsService.update(+id, updateCallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callsService.remove(+id);
  }
}
