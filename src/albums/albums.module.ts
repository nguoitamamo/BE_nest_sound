import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schema/album.schema.js';
import { AlbumsController } from './albums.controller.js';
import { AlbumsService } from './albums.service.js';
import { User, UserSchema } from '../users/schemas/user.schema.js';
import { UsersService } from '../users/users.service.js';
import { Role, RoleSchema } from '../roles/schemas/role.schema.js';
import { RolesService } from '../roles/roles.service.js';


@Module({
  imports: [MongooseModule.forFeature([
    { name: Album.name, schema: AlbumSchema },
    { name: User.name, schema: UserSchema },
    { name: Role.name, schema: RoleSchema }
  ])],
  controllers: [AlbumsController],
  providers: [AlbumsService, UsersService, RolesService],
  exports: [AlbumsService]
})
export class AlbumsModule { }
