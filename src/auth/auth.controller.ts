import { Body, Controller, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, HttpCode } from '@nestjs/common';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    userIn(@Body() data: {email: string, password: string}) {
        return this.authService.userLogin(data);
    }
}
