import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { CreateUserRequest } from 'src/users/dto/create-user.requets';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    @UseInterceptors(NoFilesInterceptor())
    createUser(@Body() request: CreateUserRequest) {
        return this.usersService.createUser(request);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@CurrentUser() user: TokenPayload){
        return 
    }
}
