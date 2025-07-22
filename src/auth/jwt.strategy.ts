//xử lí encode decode như thế nào
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private roleService: RolesService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN'),
    });
  }

  async validate(payload: IUser) {
    const { _id, name, email, role, avatar, typeLogin } = payload;




    // lấy ra permission
    const roleQuery = (await this.roleService.getPermissions(role))
    const allPermissions = roleQuery.flatMap(role => role.permissions);
    // gán vào req.user

    return {
      _id,
      name,
      email,
      role,
      avatar,
      typeLogin,
      permission: allPermissions ?? []
    };
  }

}
