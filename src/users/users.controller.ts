import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService:UsersService){

    }

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Get(':id')
    get1User(@Param('id') idUser){
        return this.userService.get1User(idUser);
    }

    @Post()
    addOneUser(@Body() userObj){
        return this.userService.addOneUser(userObj);
    }

    @Put(':id')
    async updateOneUser(@Param('id') id, @Body() userObj){
        return this.userService.updateOneUser(id, userObj);
        
    }

    @Delete(':id')
    deleteOneUser(@Param('id') id:String){
        return this.userService.deleteOneUser(id);
    }

     
    
}
