import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ForgotPasswordDto, LoginDto } from './auth.dto';
import { ParsePasswordTokenPipe } from '../../common/pipes/parse-password-token.pipe';

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

  @Get('check-password-token/:token')
  async checkPasswordToken(
    @Param('token', ParsePasswordTokenPipe) token: string,
  ): Promise<boolean> {
    return await this.authService.checkPasswordToken(token);
  }

  @Patch('forgot-password/:user_id')
  async forgotPassword(
    @Param('user_id') userId: string,
    @Body() data: ForgotPasswordDto,
  ): Promise<boolean> {
    return await this.authService.forgotPassword(userId, data);
  }
}
