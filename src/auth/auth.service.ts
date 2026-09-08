import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { checkPassword } from '../utils/function';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService, 
        private jwtService: JwtService,
        private prisma: PrismaService
    ) {}

    async userLogin(data: {email: string, password: string}): 
    Promise<{status: boolean, accesstoken?: string, error?: string}> {
        try {
            const user = await this.userService.findOne(data.email);

            if(!user) {
                return {
                    status: false,
                    error: "Wrong credentials"
                }
            }else{
                const passwordIsValid = await checkPassword(data.password, user.password!.value);
                if(passwordIsValid) {
                    const payload = await this.jwtService.signAsync({sub: user.id, role: user.role});

                    await this.prisma.authenticated.create({
                        data: {
                            token: payload,
                            userId: user.id
                        }
                    })
                    
                    return {
                        status: true,
                        accesstoken: payload
                    }
                }else{
                    return {
                        status: false,
                        error: "Bad request"
                    }
                }
            }
        }catch(error) {
            throw new InternalServerErrorException(`Login user : ${error}`)
        }
    }

    async userLogout(token: string, userId: string) {
        try {
            const checkTokenInDb = await this.prisma.authenticated.findUnique({
                where: {
                    token,
                    userId
                }
            });

            if(checkTokenInDb) {
                return {
                    status: false,
                    message: "You aren't connected"
                }
            }

            await this.prisma.authenticated.delete({
                where: {token, userId}
            });


        }catch(error) {
            throw new InternalServerErrorException(`Logout user : ${error}`)
        }
    }

    async customerLogin() {

    }

    async customerLogout() {

    }
}
