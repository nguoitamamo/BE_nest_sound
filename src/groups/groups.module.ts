import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schemas/group.schema.js';

import { Song, SongSchema } from '../songs/schemas/song.schema.js';
import { UsersModule } from '../users/users.module.js';
import { SongsModule } from '../songs/songs.module.js';
import { GroupsController } from './groups.controller.js';
import { GroupsService } from './groups.service.js';
import { User, UserSchema } from '../users/schemas/user.schema.js';


@Module({
  imports: [MongooseModule.forFeature([
    { name: Group.name, schema: GroupSchema },
    { name: User.name, schema: UserSchema },
    { name: Song.name, schema: SongSchema }
  ]), UsersModule, SongsModule],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule { }
