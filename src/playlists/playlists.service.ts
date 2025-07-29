import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema.js';
import { CreatePlaylistDto } from './dto/create-playlist.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdatePlaylistDto } from './dto/update-playlist.dto.js';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: SoftDeleteModel<PlaylistDocument>,
  ) { }

  async create(createPlaylistDto: CreatePlaylistDto, user: IUser) {


    const existing = await this.playlistModel.findOne({
      userID: user._id,
      songID: createPlaylistDto.songID
    });

    if (existing) {
      existing.isDeleted = false;
      await existing.save();
      return existing;
    }


    return await this.playlistModel.create({
      userID: user._id,
      songID: createPlaylistDto.songID
    });
  }


  findAll() {
    return `This action returns all playlists`;
  }

  async findOne(user: IUser, limit?: number) {
    let query = this.playlistModel.find({ userID: user._id, isDeleted: false }).populate({
      path: 'songID',
      populate: [
        {
          path: 'users',
          select: '_id name',
        },
        {
          path: 'createBy',
          select: '_id name avatar followers following',
        }
      ],
    });

    if (limit) {
      query = query.limit(limit);

    }

    return await query;
  }


  async update(id: string, UpdatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistModel.updateOne({ userID: id, songID: UpdatePlaylistDto.songID }, {
      createdAt: new Date()
    })
  }

  remove(user: IUser, songID: string) {
    return this.playlistModel.softDelete({ userID: user._id, songID: songID })
  }
}
