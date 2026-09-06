import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';


@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}   

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    create(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }

    @Patch(":id") 
    update(@Body() data: UpdateUserDto, @Param("id") id: string) {
        return this.userService.update(data, id);
    }
    
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.userService.delete(id);
    }
}
