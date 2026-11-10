import { Injectable } from '@nestjs/common';
import { LoginService } from './login.service';
import { ForgotPasswordDto, LoginDto } from '../auth.dto';
import { LogoutService } from './logout.service';
import { FindSessionByTokenService } from './find-session-by-token.service';
import {
  PasswordTokenEntity,
  SessionEntity,
} from '../../../../generated/prisma/client';
import { CheckPasswordTokenService } from './check-password-token.service';
import { ForgotPasswordService } from './forgot-password.serivce';
import { GeneratePasswordTokenService } from './generate-password-token.service';
import { SendPasswordTokenEmailService } from './send-password-token-email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
    private readonly findSessionByTokenService: FindSessionByTokenService,
    private readonly checkPasswordTokenService: CheckPasswordTokenService,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly generatePasswordTokenService: GeneratePasswordTokenService,
    private readonly sendPasswordTokenEmailService: SendPasswordTokenEmailService,
  ) {}

  async login(login: LoginDto): Promise<{ token: string }> {
    return await this.loginService.execute(login);
  }

  async logout(token: string): Promise<void> {
    return await this.logoutService.execute(token);
  }

  async findSessionByToken(token: string): Promise<SessionEntity> {
    return await this.findSessionByTokenService.execute(token);
  }

  async checkPasswordToken(token: string): Promise<PasswordTokenEntity> {
    return await this.checkPasswordTokenService.execute(token);
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
}
