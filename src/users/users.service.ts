import { Injectable, ConflictException, PreconditionFailedException, BadRequestException } from '@nestjs/common';
import { User, Role_name } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import bcrypt from "bcrypt";




@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }

    async findAll(): Promise<{status: boolean, data: User[]}> {
        const result = await this.prisma.user.findMany()

        return {
            status: true,
            data: result
        };
    }

    async create(data: {
        firstname: string, 
        lastname: string, 
        email: string, 
        contact: string, 
        role: Role_name,
        password: string
    }): Promise<{status: boolean, data?: User, error?: string}> {
        try {
            const [checkEmail, checkContact] = await Promise.allSettled([
                this.prisma.user.findFirst({
                    where: {email: data.email}
                }),
                this.prisma.user.findFirst({
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

                const hashedPassword = await this.hashPassword(password);
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

    
}
