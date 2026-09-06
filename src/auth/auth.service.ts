import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { checkPassword } from '../utils/function';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async userLogin(data: {email: string, password: string}): Promise<{status: boolean, accesstoken?: string, error?: string}> {
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
                    const payload = this.jwtService.sign({sub: user.id, role: user.role});
                    
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
            throw new BadRequestException(`Login user : ${error}`)
        }
    }

    async userLogout() {

    }

    async customerLogin() {

    }

    async customerLogout() {

    }
}
