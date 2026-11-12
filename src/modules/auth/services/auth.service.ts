import { Injectable } from '@nestjs/common';
import { LoginService } from './login.service';
import { EmailVerificationDto, ForgotPasswordDto, LoginDto } from '../auth.dto';
import { LogoutService } from './logout.service';
import {
  SessionEntity,
  TokenEntity,
} from '../../../../generated/prisma/client';
import { CheckTokenService } from './check-token.service';
import { ForgotPasswordService } from './forgot-password.serivce';
import { GenerateForgotPasswordTokenService } from './generate-forgot-password-token.service';
import { CheckSessionTokenService } from './check-session-token.service';
import { FirstAccessService } from './first-access.service';
import { GenerateFirstAccessTokenService } from './generate-first-access-token.service';
import { EmailVerificationService } from './email-verification.service';
import { GenerateEmailVerificationTokenService } from './generate-email-verification-token.service';
import { FindSessionByTokenService } from './find-session-by-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
    private readonly checkTokenService: CheckTokenService,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly generateForgotPasswordTokenService: GenerateForgotPasswordTokenService,
    private readonly firstAccessService: FirstAccessService,
    private readonly generateFirstAccessTokenService: GenerateFirstAccessTokenService,
    private readonly checkSessionTokenService: CheckSessionTokenService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly generateEmailVerificationTokenService: GenerateEmailVerificationTokenService,
    private readonly findSessionByTokenService: FindSessionByTokenService,
  ) {}

  async login(login: LoginDto): Promise<SessionEntity & { raw_token: string }> {
    return await this.loginService.execute(login);
  }

  async logout(token: string): Promise<void> {
    return await this.logoutService.execute(token);
  }

  async forgotPassword(userId: string, data: ForgotPasswordDto): Promise<void> {
    return await this.forgotPasswordService.execute(userId, data);
  }

  async generateForgotPasswordToken(email: string): Promise<void> {
    return await this.generateForgotPasswordTokenService.execute(email);
  }

  async firstAccess(userId: string, data: ForgotPasswordDto): Promise<void> {
    return await this.firstAccessService.execute(userId, data);
  }

  async generateFirstAccessToken(email: string): Promise<void> {
    return await this.generateFirstAccessTokenService.execute(email);
  }

  async checkToken(token: string): Promise<TokenEntity> {
    return await this.checkTokenService.execute(token);
  }

  async checkSessionToken(token: string): Promise<SessionEntity> {
    return await this.checkSessionTokenService.execute(token);
  }

  async emailVerification(
    userId: string,
    data: EmailVerificationDto,
  ): Promise<void> {
    return await this.emailVerificationService.execute(userId, data);
  }

  async generateEmailVerificationToken(email: string): Promise<void> {
    return await this.generateEmailVerificationTokenService.execute(email);
  }

  async findSessionByToken(token: string): Promise<SessionEntity> {
    return await this.findSessionByTokenService.execute(token);
  }
}
