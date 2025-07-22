import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';






@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,

    ) { }
    // username và pass từ passport trả ra
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(username);
        // if (user && user.password === pass) {
        //     const { password, ...result } = user;
        //     return result;
        // }

        if (user) {
            const ivalidPassword = this.usersService.isValidCheckPassword(pass, user.password);
            if (ivalidPassword) {
                return user;
            }
        }
        console.log('đã vào đây');
        return null;
    }

    async login(user: IUser, type?: string) {
        const { _id, name, email, role, avatar, typeLogin, followers, following, shared } = user;

        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            name,
            email,
            role,
            avatar,
            typeLogin: type ? type : typeLogin,
            followers,
            following
        };

        return {
            access_token: this.jwtService.sign(payload),
            _id,
            name,
            email,
            role,
            avatar,
            typeLogin: type ? type : typeLogin,
            followers,
            following,
            shared
        };
    }

    async getUserByUserName(username: string) {
        return await this.usersService.findOneByEmailSocial(username);
    }

}
