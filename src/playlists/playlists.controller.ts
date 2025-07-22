import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ResponseMessage, User } from 'src/decorators/customiz';
import { IUser } from 'src/users/users.interface';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) { }

  @ResponseMessage('Add playlist thành công')
  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto, @User() user: IUser) {
    return this.playlistsService.create(createPlaylistDto, user);
  }

  @Get('all')
  findAll() {
    return this.playlistsService.findAll();
  }

  @Get()
  findOne(
    @User() user: IUser,
    @Query('limit') limit?: string
  ) {
    return this.playlistsService.findOne(user, +limit ? +limit : undefined);
  }

  @Patch('user/:id')
  update(@Param('id') id: string, @Body() UpdatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistsService.update(id, UpdatePlaylistDto);
  }

  @ResponseMessage('delete song in playlist')
  @Delete('delete/:songID')
  remove(
    @User() user: IUser,
    @Param('songID') songID: string
  ) {
    return this.playlistsService.remove(user, songID);
  }
}
