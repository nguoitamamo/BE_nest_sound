import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schemas/group.schema';
import { RolesModule } from 'src/roles/roles.module';
import { UsersService } from 'src/users/users.service';
import { SongsService } from 'src/songs/songs.service';
import { UsersModule } from 'src/users/users.module';
import { SongsModule } from 'src/songs/songs.module';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Song, SongSchema } from 'src/songs/schemas/song.schema';

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
