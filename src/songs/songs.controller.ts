import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Query } from '@nestjs/common';

import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

import { Cron, CronExpression } from '@nestjs/schedule';
import { SongsService } from './songs.service.js';
import { Public, ResponseMessage, User } from '../decorators/customiz.js';
import { IUser } from '../users/users.interface.js';
import { CreateSongDto } from './dto/create-song.dto.js';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Post()
  @ResponseMessage("Bài hát bạn đã gửi để xác nhận. ")
  create(
    @User() user: IUser,
    @Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto, user);
  }


  @Public()
  @ResponseMessage('tìm kiếm bài hát')
  @Get('search')
  search(
    @Query('query') query: string // tên bài hát hoặc là tên ca sĩ
  ) {
    return this.songsService.SearchSongByQuery(query);
  }



  @Patch('updateview/:id')
  @ResponseMessage('update view')
  updateView(@User() user: IUser, @Param('id') id: string) {
    return this.songsService.UpdateView(user, id);
  }

  @Public()
  @Get('top/:type')
  getTopSongs(@Param('type') type: 'week' | 'month') {
    return this.songsService.getTopSongsByView(type);
  }


  @Patch('like/:id')
  @ResponseMessage('post like')
  likeSong(@User() user: IUser, @Param('id') id: string) {
    return this.songsService.handleLike(user, id);
  }

  @Patch('dislike/:id')
  @ResponseMessage('post dislike')
  dislikeSong(@User() user: IUser, @Param('id') id: string) {
    return this.songsService.handleDisLike(user, id);
  }

  @Public()
  @Get()
  @ResponseMessage('get all song')
  findAll() {
    return this.songsService.findAll();
  }

  @Public()
  @Get(':id')
  @ResponseMessage('get song by id song')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }


  @Public()
  @Get('user/:id')
  @ResponseMessage('get song by id user')
  getSongByUserID(@Param('id') id: string) {
    return this.songsService.findOneByUserID(id);
  }

  @Public()
  @ResponseMessage("get all like")
  @Get('getlike/:songId')
  async handleGetAllLike(@Param('songId') songId: string) {
    return this.songsService.getAllUserLike(songId);
  }

  @Public()
  @ResponseMessage("get all dislike")
  @Get('getdislike/:songId')
  async handleGetAllDisLike(@Param('songId') songId: string) {
    return this.songsService.getAllUserDisLike(songId);
  }


  @Patch()
  update(@User() user: IUser, @Body() createSongDto: CreateSongDto) {
    return this.songsService.update(user, createSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }


  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    console.log("đã chạy vào lúc 10s");
    return this.songsService.handleCheckAudio();
  }


}
