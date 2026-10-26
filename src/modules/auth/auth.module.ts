import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthDAO } from './daos/auth.dao';
import { CreateSessionDAO } from './daos/create-session.dao';
import { FindSessionByHashTokenDAO } from './daos/find-session-by-hash-token.dao';
import { RevokeSessionDAO } from './daos/revoke-session.dao';
import { LoginService } from './services/login.service';
import { LogoutService } from './services/logout.service';
import { AuthRepository } from './auth.repository';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../../infra/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthDAO,
    CreateSessionDAO,
    FindSessionByHashTokenDAO,
    RevokeSessionDAO,
    LoginService,
    LogoutService,
    AuthRepository,
  ],
})
export class AuthModule {}
