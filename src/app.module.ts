import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';

import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

import { AppController } from './app.controller.js';
import { AdminModule } from '@adminjs/nestjs';

import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';

import { SongsModule } from './songs/songs.module.js';
import { GenresModule } from './genres/genres.module.js';
import { AlbumsModule } from './albums/albums.module.js';
import { LikesModule } from './likes/likes.module.js';
import { HistorysModule } from './historys/historys.module.js';
import { PlaylistsModule } from './playlists/playlists.module.js';
import { FilesModule } from './files/files.module.js';
import { CommentsModule } from './comments/comments.module.js';
import { PermissionsModule } from './permissions/permissions.module.js';
import { RolesModule } from './roles/roles.module.js';

import { GroupsModule } from './groups/groups.module.js';
import { ChatsModule } from './chats/chats.module.js';
import { MessagesModule } from './messages/messages.module.js';
import { AppService } from './app.service.js';
import { ChatGateway } from './chats/chats.gateway.js';
import { JwtAuthGuard } from './auth/jwt-auth.guard.js';
import { IsUniqueConstraint } from './validator/is.unique.constraint.js';
import { PaymentsModule } from './payments/payments.module.js';
import { ZoomsModule } from './zooms/zooms.module.js';
import { CallsModule } from './calls/calls.module.js';
import { WhisperModule } from './whisper/whisper.module.js';





AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});



@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }

      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    SongsModule,
    GenresModule,
    AlbumsModule,
    LikesModule,
    HistorysModule,
    PlaylistsModule,
    FilesModule,
    CommentsModule,
    PermissionsModule,
    RolesModule,
    GroupsModule,
    ChatsModule,
    MessagesModule,


    AdminModule.createAdminAsync({
      useFactory: async () => {
        return await {
          adminJsOptions: options,
          auth: {
            provider,
            cookiePassword: process.env.COOKIE_SECRET,
            cookieName: 'adminjs',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: process.env.COOKIE_SECRET,
          },
        };
      },
    }),

    PaymentsModule,

    ZoomsModule,

    CallsModule,

    WhisperModule,



  ],
  controllers: [AppController],
  providers: [AppService,
    ChatGateway,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    IsUniqueConstraint
  ],
  exports: [IsUniqueConstraint]

})
export class AppModule { }
