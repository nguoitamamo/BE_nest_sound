import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service.js';
import { ResponseMessage, User } from '../decorators/customiz.js';
import { CreateLikeDto } from './dto/create-like.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateLikeDto } from './dto/update-like.dto.js';


@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }


  @ResponseMessage('Thêm danh sách yêu thích thành công')
  @Post() // truyền vào status và _id
  create(@Body() createLikeDto: CreateLikeDto, @User() user: IUser) {
    return this.likesService.create(createLikeDto, user);
  }

  @Get()
  findAll(@User() user: IUser) {
    return this.likesService.findAllList(user);
  }

  // @Public()
  // @Get() // lấy theo _id song và userID
  // find(
  //   @Param('id') id: string,
  //   @Param('userID') userID: string
  // ) {
  //   return this.likesService.find(id, userID);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
