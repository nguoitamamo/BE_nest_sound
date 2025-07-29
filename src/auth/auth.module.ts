import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import ms from 'ms';
import { UsersModule } from '../users/users.module.js';
import { RolesModule } from '../roles/roles.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { LocalStrategy } from './passport/local.strategy.js';
import { JwtStrategy } from './jwt.strategy.js';


@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN'),
        signOptions: {
          expiresIn: ms(configService.get<number>('JWT_ACCESS_EXPIRE')),
        },
      }),
      inject: [ConfigService],
    }),
    RolesModule

  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
