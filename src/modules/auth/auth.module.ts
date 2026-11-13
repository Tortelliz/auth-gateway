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
import { FirstAccessService } from './services/first-access.service';
import { GenerateFirstAccessTokenService } from './services/generate-first-access-token.service';
import { GenerateEmailVerificationTokenService } from './services/generate-email-verification-token.service';
import { EmailVerificationService } from './services/email-verification.service';
import { FindSessionByTokenService } from './services/find-session-by-token.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserPermissionsGuard } from './guards/create-user-permissions.guard';
import { DeleteUserPermissionsGuard } from './guards/delete-user-permissions.guard';
import { FindAllUsersGuard } from './guards/find-all-users.guard';
import { YourselfGuard } from './guards/yourself.guard';
import { RoleModule } from '../role/role.module';
import { RolesGuard } from './guards/roles.guard';
import { CheckIsValidTokenGuard } from './guards/check-is-valid-token.guard';

@Global()
@Module({
  imports: [UserModule, PrismaModule, EmailModule, CompanyModule, RoleModule],
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
    FindSessionByTokenService,
    AuthRepository,
    AuthGuard,
    CreateUserPermissionsGuard,
    DeleteUserPermissionsGuard,
    FindAllUsersGuard,
    YourselfGuard,
    RolesGuard,
    CheckIsValidTokenGuard,
  ],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
