import { Injectable } from '@nestjs/common';
import { LoginService } from './login.service';
import { ForgotPasswordDto, LoginDto } from '../auth.dto';
import { LogoutService } from './logout.service';
import {
  TokenEntity,
  SessionEntity,
} from '../../../../generated/prisma/client';
import { CheckTokenService } from './check-token.service';
import { ForgotPasswordService } from './forgot-password.serivce';
import { GeneratePasswordTokenService } from './generate-password-token.service';
import { CheckSessionTokenService } from './check-session-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
    private readonly checkTokenService: CheckTokenService,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly generatePasswordTokenService: GeneratePasswordTokenService,
    private readonly checkSessionTokenService: CheckSessionTokenService,
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

  async generatePasswordToken(email: string): Promise<void> {
    return await this.generatePasswordTokenService.execute(email);
  }

  async checkToken(token: string): Promise<TokenEntity> {
    return await this.checkTokenService.execute(token);
  }

  async checkSessionToken(token: string): Promise<SessionEntity> {
    return await this.checkSessionTokenService.execute(token);
  }
}
