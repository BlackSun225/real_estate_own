import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '7d' },
        })
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        AuthService
    ],
    controllers: [AuthController]
})
export class AuthModule {}
