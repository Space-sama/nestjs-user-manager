import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { sign } from 'jsonwebtoken';
import { PayloadUser } from './user.payload';
require("dotenv").config();





@Injectable()
export class AuthenticationService {
    constructor(private userService: UsersService){

    }

    // async validateUser(firstName: string, pass: string): Promise<any>{
    //     const user = await this.userService.findOneUser(firstName);

    //     if (user && user.pwwd === pass){
    //         const {pwwd, ...otherFeilds} = user;
    //         return otherFeilds;
    //     }

    //     return null;
    // }


    // Sign the user
    async signPayload(payload: PayloadUser) {

        return sign(payload, process.env.My_JWT_Secret, { expiresIn: '1d' });
    }

    // Permission to the user
    async validateUser(payload: PayloadUser) {

    return await this.userService.findUserByPayload(payload);

    }
}
