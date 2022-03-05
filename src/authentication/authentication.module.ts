import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [UsersModule, PassportModule],
    providers: [AuthenticationService, LocalStrategy],
    exports: [UsersModule]
})
export class AuthenticationModule {}
