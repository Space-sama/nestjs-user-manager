import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { AuthenticationService } from "src/authentication/authentication.service";
require("dotenv").config();


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService: AuthenticationService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.My_JWT_Secret,
          });
    }

    // async validate(f: string, p: string): Promise<any>{
    //     const user = await this.authService.validateUser(f, p);

    //     if(!user){
    //         throw new UnauthorizedException();
    //     }

    //     return user;
    // }

    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.authService.validateUser(payload);

        if (!user) {

          return done(new HttpException('Unauthorized access for this user !', HttpStatus.UNAUTHORIZED),
            false,
          );
        }

        return done(null, user, payload.iat);
    }

}