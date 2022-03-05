import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/authentication/user.logindto';
import { User, UserModelDef } from './user.model';
import { RegisterUserDto } from './user.regdto';
import * as bcrypt from 'bcrypt';
import { PayloadUser } from '../authentication/user.payload';

@Injectable()
export class UsersService {

    constructor(@InjectModel('users') private userModel:Model<UserModelDef>){

    }


    async create(RegisterDTO: RegisterUserDto) {

        const { emaill } = RegisterDTO;
        const user = await this.userModel.findOne({ emaill });

        if (user) {

          throw new HttpException('The user you want to register is already exist !',
           HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(RegisterDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
      }
      // return without password
      sanitizeUserReg(user: UserModelDef) {
        const sanitized = user.toObject();
        delete sanitized['pwwd'];
        return sanitized;
      }


      // Login User
      async findByLogin(userLoginDto: LoginUserDto) {

        const { emaill, pwwd } = userLoginDto;

        const user = await this.userModel.findOne({ emaill });

        if (!user) {
            // 400 error for email. 
          throw new BadRequestException('We don\'t have this user yet !');
        }
        if (await bcrypt.compare(pwwd, user.pwwd)) {
          return this.sanitizeUser(user)
        } else {
            // 400 error for password.
          throw new BadRequestException('The password not matching the one we have on the database...!');
        }
      }
      sanitizeUser(user: UserModelDef) {
        const sanitized = user.toObject();
        delete sanitized['pwwd'];
        return sanitized;
      }


      // validate User by payload
      async findUserByPayload(payload: PayloadUser) {
        const { emaill } = payload;
        return await this.userModel.findOne({ emaill });
      }
   




    async getAllUsers(){
       const allUsers = await this.userModel.find().exec();
       return allUsers;
    }




    get1User(idUser){
        return this.userModel.findOne({_id: idUser});
    }

    async addOneUser(userObj){
         let userToSave = new this.userModel({
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            pseudoName: userObj.pseudoName,
            pwwd: userObj.pwwd,
            emaill: userObj.pwwd

        });
        let userCreated = await userToSave.save();
        return userCreated;
    }

    async updateOneUser(idUser, userObj){
        const findUserToEditAndUpdate =  await this.userModel.findByIdAndUpdate(idUser, userObj);
        return userObj;
    }

    deleteOneUser(id){
        return this.userModel.findByIdAndDelete(id);
        
    }

    public async findOneUser(name: string): Promise<any>{
        return await this.userModel.findOne({firstName: name});
    }


    
}
