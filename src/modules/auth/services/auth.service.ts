import { Injectable } from '@nestjs/common';
import { LoginService } from './login.service';
import { LogoutService } from './logout.service';
import { AuthDTO } from '../auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
  ) {}

  async login(login: AuthDTO): Promise<string> {
    return await this.loginService.execute(login);
  }

  async logout(token: string): Promise<boolean> {
    return await this.logoutService.execute(token);
  }
}
