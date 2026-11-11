import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { LoginDto } from '../auth.dto';
import { UserService } from '../../user/services/user.service';
import { compareService } from '../../../lib/bcrypt/compare.service';
import { SessionEntity } from '../../../../generated/prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';
import { hashToken } from '../../../utils/hash-token.util';
import { randomBytes } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../user/user.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    login: LoginDto,
  ): Promise<SessionEntity & { raw_token: string }> {
    const user = await this.getUser(login.email);
    this.checkIsActive(user);
    this.checkFirstAccess(user);
    this.checkMustChangePassword(user);
    await this.checkLoginFailAttempts(user);
    await this.checkMatchPassword(user.id, login.password, user.password);
    const token = randomBytes(32).toString('hex');
    const session = await this.authRepository.createSession(
      this.buildSession(token, user),
    );
    await this.userService.loginStamp(user.id);
    await this.userService.resetLoginFailAttempts(user.id);
    return { ...session, raw_token: token };
  }

  private buildSession(token: string, user: UserDto): SessionEntity {
    const tokenExpiresInDays = this.configService.getOrThrow<number>(
      'SESSION_TOKEN_EXPIRES_IN_DAYS',
    );
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + tokenExpiresInDays);
    return {
      id: generateUUIDUtil(),
      user_id: user.id,
      hash_token: hashToken(token),
      revoked: false,
      created_at: now,
      expires_at: expiresAt,
      revoked_at: null,
    };
  }

  private async getUser(
    email: string,
  ): Promise<UserDto & { password: string }> {
    try {
      return await this.userService.getUserWithPasswordByEmail(email);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new UnauthorizedException('Email or password is incorrect');
      throw error;
    }
  }

  private async checkMatchPassword(
    userId: string,
    inputtedPassword: string,
    userPassword: string,
  ): Promise<void> {
    const isMatch = await compareService(inputtedPassword, userPassword);
    if (!isMatch) {
      await this.userService.addLoginFailAttempt(userId);
      throw new UnauthorizedException('Email or password is incorrect');
    }
  }

  private checkFirstAccess(user: UserDto): void {
    if (user.first_access)
      throw new UnauthorizedException('The user must perform the first access');
  }

  private checkIsActive(user: UserDto): void {
    if (!user.active) throw new UnauthorizedException('User is not active');
  }

  private checkMustChangePassword(user: UserDto): void {
    if (user.must_change_password)
      throw new UnauthorizedException('User must change password');
  }

  private async checkLoginFailAttempts(user: UserDto): Promise<void> {
    if (user.failed_login_attempts >= 5) {
      await this.userService.setMustChangePassword(user.id);
      throw new UnauthorizedException(
        'The number of login attempts has been exceeded; you must change your password',
      );
    }
  }
}
