import {
  Body,
  Controller,
  Cookies,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ForgotPasswordDto, LoginDto } from './auth.dto';
import { ParsePasswordTokenPipe } from '../../common/pipes/parse-password-token.pipe';
import { ParseEmailPipe } from '../../common/pipes/parse-email.pipe';
import { HttpAdapterHost } from '@nestjs/core';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adapterHost: HttpAdapterHost,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: unknown,
  ): Promise<{ message: string }> {
    const session = await this.authService.login(loginDto);
    this.adapterHost.httpAdapter.setCookie(
      response,
      'session_token',
      session.raw_token,
      {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: session.expires_at,
      },
    );
    return {
      message: 'Login successfully',
    };
  }

  @Post('logout')
  async logout(
    @Cookies('session_token') token: string,
  ): Promise<{ message: string }> {
    await this.authService.logout(token);
    return {
      message: 'Logout successfully',
    };
  }

  @Post('generate-password-token/:email')
  async generatePasswordToken(
    @Param('email', ParseEmailPipe) email: string,
  ): Promise<{ message: string }> {
    await this.authService.generatePasswordToken(email);
    return {
      message:
        'If you are registered in the system, you will receive a token via email; please check your email inbox.',
    };
  }

  @Get('check-token/:token')
  async checkToken(
    @Param('token', ParsePasswordTokenPipe) token: string,
  ): Promise<{ message: string }> {
    await this.authService.checkToken(token);
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
