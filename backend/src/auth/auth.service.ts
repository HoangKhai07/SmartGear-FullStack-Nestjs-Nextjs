import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import ms from 'ms';
import { TokenPayload } from 'src/prisma/token-payload.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()   
export class AuthService {
    constructor(
        private readonly userService: UsersService, 
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ){}

     private parseTimeToMilliseconds(timeString: string): number {
        const timeValue = parseInt(timeString);
        const timeUnit = timeString.slice(-1).toLowerCase();

        switch (timeUnit) {
            case 's': 
                return timeValue * 1000;
            case 'm': 
                return timeValue * 60 * 1000;
            case 'h':
                return timeValue * 60 * 60 * 1000;
            case 'd': 
                return timeValue * 24 * 60 * 60 * 1000;
            default:
                return isNaN(timeValue) ? 0 : timeValue;
        }
    }

    async login(user: User, response: Response){
        const jwtExpiration = this.configService.getOrThrow('JWT_EXPIRATION');
        const expirationMiliseconds = this.parseTimeToMilliseconds(jwtExpiration)

        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + expirationMiliseconds)

        const tokenPayload: TokenPayload = {
            userId: user.id,
        };

        const token = this.jwtService.sign(tokenPayload);

        response.cookie('Authentication', token, {
            secure: true,
            httpOnly: true,
            expires: expires,
        });

        return { tokenPayload }
    };

    async verifyUser(email: string, password: string){
        try {
            const user = await this.userService.getUser({email})
            const authenticated = await bcrypt.compare(password, user.password);
            if(!authenticated){
                throw new UnauthorizedException();
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException("Credentials are not valid")
        }
    }
}
