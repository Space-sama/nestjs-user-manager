import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userSchema } from './users/user.model';

@Injectable()
export class AppService {


  getHello(): string {
    return 'Hello World!';
  }
}
