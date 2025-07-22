import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import ms from 'ms';
import { AuthController } from './auth.controller';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';

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
