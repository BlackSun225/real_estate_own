import { Body, Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { Public } from './public.decorator';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("user/login")
    userIn(@Body() data: {email: string, password: string}) {
        return this.authService.userLogin(data);
    }

    @HttpCode(HttpStatus.OK)
    @Get("user")
    userOut(@Req() req: Request) {
        return this.authService.userLogout(req.user!.token, req.user!.sub);
    } 
    
    
}
