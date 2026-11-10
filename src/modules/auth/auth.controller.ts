import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ForgotPasswordDto, LoginDto } from './auth.dto';
import { ParsePasswordTokenPipe } from '../../common/pipes/parse-password-token.pipe';
import { ParseEmailPipe } from '../../common/pipes/parse-email.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return await this.authService.login(loginDto);
  }

  @Patch('logout')
  async logout(@Body() body: { token: string }): Promise<{ message: string }> {
    await this.authService.logout(body.token);
    return {
      message: 'Logout successfully',
    };
  }

  @Post('generate-password-token/:email')
  async generatePasswordToken(
    @Param('email', ParseEmailPipe) email: string,
  ): Promise<{ message: string }> {
    await this.authService.sendPasswordTokenEmail(email);
    return {
      message:
        'If you are registered in the system, you will receive a token via email; please check your email inbox.',
    };
  }

  @Get('check-password-token/:token')
  async checkPasswordToken(
    @Param('token', ParsePasswordTokenPipe) token: string,
  ): Promise<{ message: string }> {
    await this.authService.checkPasswordToken(token);
    return {
      message: 'Token is valid',
    };
  }

  @Patch('forgot-password/:user_id')
  async forgotPassword(
    @Param('user_id') userId: string,
    @Body() data: ForgotPasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.forgotPassword(userId, data);
    return {
      message: 'Password changed successfully',
    };
  }
}
