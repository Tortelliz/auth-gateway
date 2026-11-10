import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return await this.authService.login(loginDto);
  }

  @Patch('logout')
  async logout(@Body() body: { token: string }): Promise<boolean> {
    return await this.authService.logout(body.token);
  }
}
