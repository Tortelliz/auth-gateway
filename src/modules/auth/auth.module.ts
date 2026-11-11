import { Global, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthDao } from './daos/auth.dao';
import { CreateSessionDao } from './daos/create-session.dao';
import { UpdateSessionDao } from './daos/update-session.dao';
import { LoginService } from './services/login.service';
import { AuthRepository } from './auth.repository';
import { FindSessionByTokenDao } from './daos/find-session-by-token.dao';
import { LogoutService } from './services/logout.service';
import { FindSessionByTokenService } from './services/find-session-by-token.service';
import { CreateTokenDao } from './daos/create-token.dao';
import { FindTokenByTokenDao } from './daos/find-token-by-token.dao';
import { UpdateTokenDao } from './daos/update-token.dao';
import { CheckTokenService } from './services/check-token.service';
import { ForgotPasswordService } from './services/forgot-password.serivce';
import { GeneratePasswordTokenService } from './services/generate-password-token.service';
import { EmailModule } from '../../lib/resend/email.module';
import { SendPasswordTokenEmailService } from './services/send-password-token-email.service';
import { CheckSessionTokenService } from './services/check-session-token.service';

@Global()
@Module({
  imports: [UserModule, PrismaModule, EmailModule],
  controllers: [AuthController],
  providers: [
    AuthDao,
    CreateSessionDao,
    UpdateSessionDao,
    FindSessionByTokenDao,
    CreateTokenDao,
    FindTokenByTokenDao,
    UpdateTokenDao,
    AuthService,
    LoginService,
    LogoutService,
    FindSessionByTokenService,
    CheckTokenService,
    CheckSessionTokenService,
    ForgotPasswordService,
    GeneratePasswordTokenService,
    SendPasswordTokenEmailService,
    AuthRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
