
import {
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorators/customiz';
import { Request } from 'express';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest(err, user, info, context: ExecutionContext) {

        // 
        // You can throw an exception based on either "info" or "err" arguments

        const request: Request = context.switchToHttp().getRequest();


        if (err || !user) {
            throw err || new UnauthorizedException("Token không hợp lệ!");
        }



        const targetEnpoint = request?.route?.path;
        const tartgetMethod = request?.method;
        const permission = user?.permission;

        const exit = (permission.find(tmp =>
            tmp.apiPath === targetEnpoint && tmp.method === tartgetMethod
        ))

        if (!exit) throw new ForbiddenException('Bạn không có quyền truy cập endpoint này')



        return user;
    }
}
