import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { LoginDto } from '../auth.dto';
import { UserService } from '../../user/services/user.service';
import { compareService } from '../../../lib/bcrypt/compare.service';
import { SessionEntity } from '../../../../generated/prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';
import { FullUserEntity } from '../../user/user.entity';
import { hashToken } from '../../../utils/hash-token.util';
import { randomBytes } from 'node:crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async execute(login: LoginDto): Promise<{ token: string }> {
    const user = await this.getUser(login.email);
    this.checkIsActive(user);
    this.checkMustChangePassword(user);
    await this.checkLoginFailAttempts(user);
    await this.checkMatchPassword(user.id, login.password, user.password);
    const token = randomBytes(32).toString('hex');
    await this.authRepository.createSession(this.buildSession(token, user));
    return { token };
  }

  private buildSession(token: string, user: FullUserEntity): SessionEntity {
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

  private async getUser(email: string): Promise<FullUserEntity> {
    try {
      return await this.userService.getFullUserByEmail(email);
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

  private checkIsActive(user: FullUserEntity): void {
    if (!user.active) throw new UnauthorizedException('User is not active');
  }

  private checkMustChangePassword(user: FullUserEntity): void {
    if (user.must_change_password)
      throw new UnauthorizedException('User must change password');
  }

  private async checkLoginFailAttempts(user: FullUserEntity): Promise<void> {
    if (user.failed_login_attempts >= 5) {
      await this.userService.setMustChangePassword(user.id);
      throw new UnauthorizedException(
        'The number of login attempts has been exceeded; you must change your password',
      );
    }
  }
}
