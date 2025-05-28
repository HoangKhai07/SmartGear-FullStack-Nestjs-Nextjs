import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from 'src/users/dto/create-user.requets';

@Injectable()
export class UsersService {
    createUser(data: CreateUserRequest ) {
        console.log(data)
    }
}
