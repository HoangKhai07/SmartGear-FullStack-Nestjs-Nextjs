import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(
        @CurrentUser() user: User,
        @Res({passthrough: true}) response: Response,
     ) {
        return this.authService.login(user, response)
    }
}
