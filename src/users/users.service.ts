import { Injectable, PreconditionFailedException, BadRequestException } from '@nestjs/common';
import { User, Role_name } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { /*checkPassword,*/ hashPassword } from '../utils/function';
import { CreateUserDto, UpdateUserDto } from './user.dto';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<{status: boolean, data: User[]}> {
        const result = await this.prisma.user.findMany()

        return {
            status: true,
            data: result
        };
    }

    async create(data: CreateUserDto): Promise<{status: boolean, data?: User, error?: string}> {
        try {
            const [checkEmail, checkContact] = await Promise.allSettled([
                this.prisma.user.findUnique({
                    where: {email: data.email}
                }),
                this.prisma.user.findUnique({
                    where: {contact: data.contact}
                })
            ]); 

            if(checkEmail.status == "fulfilled" && checkContact.status == "fulfilled") {
                if(checkContact.value) {
                    return {
                        status: false,
                        error: "Please use another contact"
                    }
                }
                if(checkEmail.value) {
                    return {
                        status: false,
                        error: "Please use another email"
                    }
                }

                // if(([Role_name.Admin, Role_name.Manager] as Role_name[]).includes(data.role)) {

                // }
                if(data.role !== Role_name.Admin && data.role !== Role_name.Manager) {
                    return {
                        status: false,
                        error: "Unauthorized role"
                    }
                }

                data.email = data.email.toLowerCase();
                const {password, ...userData} = data;

                const result = await this.prisma.user.create({
                    data: userData
                });

                const hashedPassword = await hashPassword(password);
                await this.prisma.password.create({
                    data: {
                        value: hashedPassword,
                        userId: result.id
                    }
                });

                return {
                    status: true,
                    data: result
                }

            }else{
                throw new PreconditionFailedException("Checks for email and contact failed")
            }
        }catch(error) {
            throw new BadRequestException(`User registration error: ${error}`);
        }
    }
    
    async update(data: UpdateUserDto, id: string): Promise<{status: boolean, message?: string, error?: string}>  {
        try {
            const checkUser = await this.prisma.user.findUnique({
                where: {id}
            });

            if(!checkUser) {
                return {
                    status: false,
                    error: "User not found"
                }
            }

            if(data.role) {
                if(data.role == checkUser.role) {
                    delete data.role;
                }else if(data.role == Role_name.Superadmin) {
                    return {
                        status: false,
                        error: "You can't create a superadmin"
                    }
                }else if(checkUser.role == Role_name.Superadmin  && (data.role == Role_name.Admin || data.role == Role_name.Manager )) {
                    return {
                        status: false,
                        error: "You can't change the profile of a superadmin"
                    }
                }
            }

            const {password, ...userData} = data;

            if(password) {
                await this.prisma.password.update({
                    data: {value: data.password},
                    where: {id}
                })
                delete data.password;
            }

            if(Object.keys(userData).length) {
                await this.prisma.user.update({
                    data: userData,
                    where: {id}
                })
            }

            return {
                status: true,
                message: "User updated"
            }

        }catch(error) {
            throw new BadRequestException(`User update error: ${error}`);
        }
    }
    
    async delete(userId: string): Promise<{status: boolean, message?: string, error?: string}> {
        try {
            const checkUser = await this.prisma.user.findUnique({
                where: {id: userId}
            });

            if(!checkUser) {
                return {
                    status: false,
                    error: "User not found"
                }
            }else if(checkUser.role == Role_name.Superadmin) {
                return {
                    status: false,
                    message: "You can't delete the superadmin"
                }
            }else{
                const deletedUser = this.prisma.user.delete({
                    where: {id: userId}
                });

                const deletedUserPassword = this.prisma.password.delete({
                    where: {
                        userId
                    }
                })

                await this.prisma.$transaction([deletedUser, deletedUserPassword]);

                return {
                    status: true,
                    message: "User deleted with its password"
                }
            }
        }catch(error) {
            throw new BadRequestException(`User deletion error: ${error}`);
        }
    }

    async forgottenPassword() {

    }

    async findOne(email: string) {
        const user =  this.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                password: true
            }
        })

        return user;
    }
}
