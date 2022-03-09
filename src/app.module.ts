import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
//import { UsersController } from './users/users.controller';
//import { UsersService } from './users/users.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthController } from './authentication/authentication.controller';
require("dotenv").config();

@Module({
  //'mongodb://localhost:27017/dbusers'
  imports: [UsersModule, MongooseModule.forRoot(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ljs3d.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    ), AuthenticationModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthenticationService],
})

export class AppModule {}
