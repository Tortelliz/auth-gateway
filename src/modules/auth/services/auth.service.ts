import { Injectable } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from '../auth.dto';
import { LogoutService } from './logout.service';
import { FindSessionByTokenService } from './find-session-by-token.service';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
    private readonly findSessionByTokenService: FindSessionByTokenService,
  ) {}

  async login(login: LoginDto): Promise<{ token: string }> {
    return await this.loginService.execute(login);
  }

  async logout(token: string): Promise<boolean> {
    return await this.logoutService.execute(token);
  }

  async findSessionByToken(token: string): Promise<SessionEntity> {
    return await this.findSessionByTokenService.execute(token);
  }
}
