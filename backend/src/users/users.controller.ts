import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from 'src/users/dto/create-user.requets';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    createUser(@Body() request: CreateUserRequest) {
        return this.usersService.createUser(request)
    }
}
