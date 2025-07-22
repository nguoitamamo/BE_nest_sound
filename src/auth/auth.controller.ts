import { Controller, Get, Render, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorators/customiz';
import { LocalAuthGuard } from './local-auth.guard';
import { IBody } from 'src/global/global.interface';
import { IUser } from 'src/users/users.interface';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    handleLogin(@Request() req) {
        return this.authService.login(req.user);
    }

    @Public()
    @ResponseMessage('login with social')
    @Post('/social')
    async handleLoginSocial(@Body() body: IBody) {
        const user: IUser = await this.authService.getUserByUserName(body.username);

        return this.authService.login(user, body.type);
    }



    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
