import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorysService } from './historys.service.js';
import { ResponseMessage, User } from '../decorators/customiz.js';
import { CreateHistoryDto } from './dto/create-history.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateHistoryDto } from './dto/update-history.dto.js';


@Controller('historys')
export class HistorysController {
  constructor(private readonly historysService: HistorysService) { }


  @Post()
  @ResponseMessage('create history user')
  create(@Body() createHistoryDto: CreateHistoryDto, @User() user: IUser) {
    return this.historysService.create(createHistoryDto, user);
  }

  @Get()
  findAll() {
    return this.historysService.findAll();
  }


  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.historysService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historysService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historysService.remove(+id);
  }
}
