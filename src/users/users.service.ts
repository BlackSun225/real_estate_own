import { Injectable, ConflictException } from '@nestjs/common';
import { User } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return [];
    }
}
