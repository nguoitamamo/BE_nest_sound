import { AdminJSOptions } from 'adminjs';

import componentLoader from './component-loader.js';
import { UserModel } from '../users/schemas/user.schema.js';
import { SongModel } from '../songs/schemas/song.schema.js';
import { RoleModel } from '../roles/schemas/role.schema.js';
import { PermissionModel } from '../permissions/schemas/permission.schema.js';
import { PlaylistModel } from '../playlists/schemas/playlist.schema.js';
import { AlbumModel } from '../albums/schema/album.schema.js';
import { ChatModel } from '../chats/schemas/chat.schema.js';
import { CommentModel } from '../comments/schemas/comment.schema.js';
import { GenreModel } from '../genres/schemas/genre.schema.js';
import { GroupModel } from '../groups/schemas/group.schema.js';
import { HistoryModel } from '../historys/schemas/history.schema.js';
import { LikeModel } from '../likes/schemas/like.schema.js';
import { MessageModel } from '../messages/schemas/message.schema.js';



const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [UserModel, SongModel, PermissionModel, RoleModel,
    PlaylistModel, AlbumModel, ChatModel, CommentModel, GenreModel,
    GroupModel, HistoryModel, LikeModel, MessageModel],
  databases: [],
};

export default options;
