import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRequest } from 'src/users/dto/create-user.requets';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor (private readonly prismaService: PrismaService){}
    async createUser(data: CreateUserRequest ) : Promise<User> {
       try {
        return await this.prismaService.user.create({
            data: {
                ...data,    
                password: await bcrypt.hash(data.password, 10)
            },
        })
       } catch (err) {
        if(err.code === "P2002") {
            throw new UnauthorizedException("Email already exists")
        }
        throw err;
       }
    }
}
