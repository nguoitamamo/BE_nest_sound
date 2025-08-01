import { Injectable, NotFoundException } from '@nestjs/common';

import { Types } from 'mongoose';


import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { InjectModel } from '@nestjs/mongoose';
import { Song, SongDocument } from './schemas/song.schema.js';
import { UsersService } from '../users/users.service.js';
import { GenresService } from '../genres/genres.service.js';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CreateSongDto } from './dto/create-song.dto.js';
import { IUser } from '../users/users.interface.js';


@Injectable()
export class SongsService {

  constructor(
    @InjectModel(Song.name) private songModel: SoftDeleteModel<SongDocument>,
    private userService: UsersService,
    private genreService: GenresService,
  ) { }

  async create(createSongDto: CreateSongDto, user: IUser) {

    const usersEd = await this.userService.checkUserExist(createSongDto.users);
    if (!usersEd) return 'user đã chọn không tồn tại';

    const genresEd = await this.genreService.checkGenerExist(createSongDto.genres);
    if (!genresEd) return 'genre đã chọn không tồn tại';


    return await this.songModel.create({
      name: createSongDto.name,
      genres: createSongDto.genres,
      users: createSongDto.users,
      audio: createSongDto.audio,
      cover: createSongDto.cover,
      state: createSongDto.state,
      isVip: createSongDto?.isVip || false,
      createBy: {
        _id: user._id,
        name: user.name
      }
    })
  }


  async SearchSongByQuery(query: string) {
    const songs = await this.songModel
      .find({ name: { $regex: query, $options: 'i' } })
      .populate('users', 'name avatar')
      .populate('createBy', '_id name avatar following followers');

    const byArtist = await this.songModel
      .find()
      .populate({
        path: 'users',
        match: { name: { $regex: query, $options: 'i' } },
        select: 'name avatar',
      })
      .populate('createBy', '_id name avatar following followers');;

    const matchedByArtist = byArtist.filter(song => song.users.length > 0);

    // Gộp và loại bỏ trùng
    const allSongs = [...songs, ...matchedByArtist];
    const uniqueSongs = Array.from(new Set(allSongs.map(s => s._id.toString())))
      .map(id => allSongs.find(s => s._id.toString() === id));

    return uniqueSongs;
  }


  async UpdateView(user: IUser, id: string) {
    const song = await this.songModel.findById(id);

    const alreadyListened = song.totalListen.some(
      (entry) => entry._id.toString() === user._id.toString()
    );

    if (!alreadyListened) {
      song.totalListen.push({
        _id: new Types.ObjectId(user._id),
        date: new Date(),
      });
      await song.save();
    }

    return song?.totalListen;
  }


  async getTopSongsByView(type: 'week' | 'month') {
    const now = new Date();
    const [startDate, endDate] =
      type === 'week'
        ? [startOfWeek(now, { weekStartsOn: 1 }), endOfWeek(now, { weekStartsOn: 1 })]
        : [startOfMonth(now), endOfMonth(now)];

    const songs = await this.songModel.aggregate([
      {
        $addFields: {
          totalListen: {
            $filter: {
              input: "$totalListen",
              as: "listen",
              cond: {
                $and: [
                  { $gte: ["$$listen.date", startDate] },
                  { $lte: ["$$listen.date", endDate] }
                ]
              }
            }
          }
        }
      },
      { $sort: { "totalListen.length": -1 } }, // sắp xếp theo số lượng lượt nghe
      { $limit: 5 }
    ]);



    return this.songModel.populate(songs, [
      { path: 'users', select: '_id name' },
      { path: 'like', select: '_id name' },
      { path: 'dislike', select: '_id name' },
      { path: 'createBy', select: '_id name avatar following followers' },
    ]);
  }




  isSchemaExits(column: string, value: string) {
    return this.songModel.findOne({ [column]: value })
  }

  findAll() {
    return this.songModel.find().populate('users', '_id name')
  }

  async findOne(id: string) {
    return await this.songModel
      .findOne({ _id: id, state: 'action' })
      .populate('users', '_id name')
      .populate('createBy', '_id name avatar following followers')
  }




  async findOneByUserID(id: string) {
    const users = await this.songModel
      .find(
        {
          users: new Types.ObjectId(id)
          , state: 'action'
        }
      )
      .populate('users', '_id name')
      .populate('createBy', '_id name avatar following followers');



    return users;

  }


  async update(user: IUser, createSongDto: CreateSongDto) {
    return await this.songModel.updateOne({ _id: createSongDto._id }, {
      ...createSongDto,
      updateBy: {
        _id: user._id,
        name: user.name
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }

  async handleLike(user: IUser, id: string) {
    const updatedSong = await this.songModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { like: user._id },
        $pull: { dislike: user._id }
      },
      { new: true }
    );

    return updatedSong?.like

  }


  async handleDisLike(user: IUser, id: string) {

    const updatedSong = await this.songModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { dislike: user._id },
        $pull: { like: user._id }
      },
      { new: true }
    );

    return updatedSong?.dislike
  }

  async getAllUserLike(songId: string) {
    const song = await this.songModel.findById(songId).populate('like', 'name email avatar');
    if (!song) throw new NotFoundException('Song not found');
    return song.like;
  }


  async getAllUserDisLike(songId: string) {
    const song = await this.songModel.findById(songId).populate('dislike', 'name email avatar');
    if (!song) throw new NotFoundException('Song not found');
    return song.dislike;
  }



  // async transcribeAudio(filePath: string): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     // const pythonFile = path.join(__dirname, '.', 'CheckAudio', 'transcribe.py');
  //     const python = spawn('python', ['D:\\BE_Nestjs\\nestjs-basic\\src\\CheckAudio\\transcribe.py', filePath]);

  //     let result = '';

  //     python.stdout.on('data', (data) => {
  //       result += data.toString();
  //     });

  //     python.stderr.on('data', (data) => {
  //       console.error('stderr:', data.toString());
  //     });

  //     python.on('error', (err) => {
  //       reject(err);
  //     });

  //     python.on('close', () => {
  //       const output = result.trim();
  //       resolve(output === 'True');
  //     });
  //   });
  // }


  // async handleCheckAudio() {
  //   const songs = await this.songModel.find({ state: 'confirm' });
  //   for (const song of songs) {
  //     console.log(">> check song after", song);
  //     const filePath = path.join(__dirname, '..', '..', 'public', 'audio', song.audio);
  //     console.log(filePath);
  //     const hasTrue = await this.transcribeAudio(filePath);
  //     if (hasTrue) {
  //       await song.updateOne({ state: 'action' })
  //       console.log(">> check song", song);
  //     }
  //   }
  // }


}
