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
import { CreateTokenDao } from './daos/create-token.dao';
import { FindTokenByTokenDao } from './daos/find-token-by-token.dao';
import { UpdateTokenDao } from './daos/update-token.dao';
import { CheckTokenService } from './services/check-token.service';
import { ForgotPasswordService } from './services/forgot-password.serivce';
import { GenerateForgotPasswordTokenService } from './services/generate-forgot-password-token.service';
import { EmailModule } from '../../lib/resend/email.module';
import { CompanyModule } from '../company/company.module';
import { CheckSessionTokenService } from './services/check-session-token.service';
import { FirstAccessService } from './services/first-access.service';
import { GenerateFirstAccessTokenService } from './services/generate-first-access-token.service';
import { GenerateEmailVerificationTokenService } from './services/generate-email-verification-token.service';
import { EmailVerificationService } from './services/email-verification.service';

@Global()
@Module({
  imports: [UserModule, PrismaModule, EmailModule, CompanyModule],
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
    CheckTokenService,
    ForgotPasswordService,
    EmailVerificationService,
    GenerateForgotPasswordTokenService,
    FirstAccessService,
    GenerateFirstAccessTokenService,
    GenerateEmailVerificationTokenService,
    CheckSessionTokenService,
    AuthRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
