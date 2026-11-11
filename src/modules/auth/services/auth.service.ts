import { Injectable } from '@nestjs/common';
import { LoginService } from './login.service';
import { ForgotPasswordDto, LoginDto } from '../auth.dto';
import { LogoutService } from './logout.service';
import { FindSessionByTokenService } from './find-session-by-token.service';
import {
  TokenEntity,
  SessionEntity,
} from '../../../../generated/prisma/client';
import { CheckTokenService } from './check-token.service';
import { ForgotPasswordService } from './forgot-password.serivce';
import { GeneratePasswordTokenService } from './generate-password-token.service';
import { SendPasswordTokenEmailService } from './send-password-token-email.service';
import { CheckSessionTokenService } from './check-session-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
    private readonly findSessionByTokenService: FindSessionByTokenService,
    private readonly checkTokenService: CheckTokenService,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly generatePasswordTokenService: GeneratePasswordTokenService,
    private readonly sendPasswordTokenEmailService: SendPasswordTokenEmailService,
    private readonly checkSessionTokenService: CheckSessionTokenService,
  ) {}

  async login(login: LoginDto): Promise<SessionEntity & { raw_token: string }> {
    return await this.loginService.execute(login);
  }

  async logout(token: string): Promise<void> {
    return await this.logoutService.execute(token);
  }

  async findSessionByToken(token: string): Promise<SessionEntity> {
    return await this.findSessionByTokenService.execute(token);
  }

  async checkPasswordToken(token: string): Promise<TokenEntity> {
    return await this.checkTokenService.execute(token);
  }

  async forgotPassword(userId: string, data: ForgotPasswordDto): Promise<void> {
    return await this.forgotPasswordService.execute(userId, data);
  }

  async generatePasswordToken(userId: string): Promise<{ token: string }> {
    return await this.generatePasswordTokenService.execute(userId);
  }

  async sendPasswordTokenEmail(email: string): Promise<void> {
    await this.sendPasswordTokenEmailService.execute(email);
  }

  async checkSessionToken(token: string): Promise<SessionEntity> {
    return await this.checkSessionTokenService.execute(token);
  }
}
