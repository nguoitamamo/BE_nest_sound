import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { CompaniesModule } from './companies/companies.module';
import { SongsModule } from './songs/songs.module';
import { GenresModule } from './genres/genres.module';

import { IsUniqueConstraint } from './validator/is.unique.constraint';
import { EntityManager } from 'typeorm';
import { AlbumsModule } from './albums/albums.module';
import { LikesModule } from './likes/likes.module';
import { HistorysModule } from './historys/historys.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { FilesModule } from './files/files.module';
import { CommentsModule } from './comments/comments.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { DatabasesModule } from './databases/databases.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GroupsModule } from './groups/groups.module';
import { ChatGateway } from './chats/chats.gateway';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';




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
    CompaniesModule,
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
    DatabasesModule,
    GroupsModule,
    ChatsModule,
    MessagesModule,
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
