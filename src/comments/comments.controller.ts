import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public, ResponseMessage, User } from 'src/decorators/customiz';
import { IUser } from 'src/users/users.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @ResponseMessage('create comment')
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @User() user: IUser) {
    return this.commentsService.create(createCommentDto, user);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Public()
  @ResponseMessage('get comment theo id song')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
