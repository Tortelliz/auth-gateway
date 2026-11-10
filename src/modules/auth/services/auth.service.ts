import { Injectable } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from '../auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly loginService: LoginService) {}

  async login(login: LoginDto): Promise<{ token: string }> {
    return await this.loginService.execute(login);
  }
}
