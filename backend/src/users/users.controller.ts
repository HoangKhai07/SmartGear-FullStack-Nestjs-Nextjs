import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreateUserRequest } from 'src/users/dto/create-user.requets';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    @UseInterceptors(NoFilesInterceptor())
    createUser(@Body() request: CreateUserRequest) {
        return this.usersService.createUser(request)
    }
}
