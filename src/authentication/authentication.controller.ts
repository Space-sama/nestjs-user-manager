import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterUserDto } from "src/users/user.regdto";
import { UsersService } from "src/users/users.service";
import { AuthenticationService } from "./authentication.service";
import { LoginUserDto } from "./user.logindto";

@Controller('auth')
export class AuthController {
    constructor(private userService: UsersService, private authService: AuthenticationService,) {

    }

    @Get("/private_info")
    @UseGuards(AuthGuard("jwt"))
 
    async hiddenInformation(){
        return  "Welcome user ! you just signed by your Token ..";
    }



    @Post('register_user')
    async register(@Body() RegisterDTO: RegisterUserDto) {
      const user = await this.userService.create(RegisterDTO);

      const payload = {
        emaill: user.emaill,
        pwwd: user.pwwd,
      };
  
      const userToken =  await this.authService.signPayload(payload);
      return { user, userToken };
    }


    @Post('login_user')
    async login(@Body() userLoginDto: LoginUserDto) {
      const user = await this.userService.findByLogin(userLoginDto);

      const payload = {
        emaill: user.emaill,
        pwwd: user.pwwd,
      };
      const userToken = await this.authService.signPayload(payload);
      return { user, userToken};
    }

}