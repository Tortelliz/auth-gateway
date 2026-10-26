import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: AuthDTO): Promise<string> {
    return await this.authService.login(data);
  }

  @Post('logout/:token')
  async logout(@Param('token', ParseUUIDPipe) token: string): Promise<boolean> {
    return await this.authService.logout(token);
  }
}
