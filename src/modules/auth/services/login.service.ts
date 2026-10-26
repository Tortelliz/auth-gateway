import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { AuthDTO } from '../auth.dto';
import { UserService } from '../../user/services/user.service';
import { compareService } from '../../../lib/bcrypt/compare.service';
import { SessionEntity } from '../auth.entity';
import { UserDTO } from '../../user/user.dto';
import { ConfigService } from '@nestjs/config';
import { hashToken } from '../../../utils/hash-token.util';

@Injectable()
export class LoginService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async execute(login: AuthDTO): Promise<string> {
    const limitLoginAttempts = Number(
      this.configService.getOrThrow<string>('LIMIT_LOGIN_ATTEMPTS'),
    );
    const user = await this.userService.findByEmail(login.email);
    if (!user)
      throw new UnauthorizedException('Email or passwords do not match');
    if (!user.active) throw new UnauthorizedException('User is disabled');
    if (user.must_change_password)
      throw new UnauthorizedException('Must change password');
    const remaining = limitLoginAttempts - (user.failed_login_attempts + 1);
    if (remaining == 0) {
      await this.setMustChangePassword(user.id);
      throw new UnauthorizedException(
        'The number of attempts has been exceeded; you must change password',
      );
    }
    if (user.failed_login_attempts == limitLoginAttempts) {
      await this.setMustChangePassword(user.id);
      throw new UnauthorizedException(
        'The number of attempts has been exceeded; you must change password',
      );
    }
    const resPass = await this.userService.findPasswordByEmail(user.email);
    if (!resPass) {
      await this.addFailAttempt(user.id);
      throw new UnauthorizedException(
        `Email or passwords do not match, remaining attempts: ${remaining}`,
      );
    }
    const isMatch = await compareService(login.password, resPass.password);
    if (!isMatch) {
      await this.addFailAttempt(user.id);
      throw new UnauthorizedException(
        `Email or passwords do not match, remaining attempts: ${remaining}`,
      );
    }
    const str = crypto.randomUUID();
    const builtSession = this.buildSession(user, str);
    await this.authRepository.createSession(builtSession);
    await this.userService.resetPasswordFailsAttempts(user.id);
    return str;
  }

  private buildSession(user: UserDTO, hashString: string): SessionEntity {
    const time = this.configService.getOrThrow<number>(
      'SESSION_TOKEN_EXPIRES_IN_DAYS',
    );
    const now = new Date();
    return {
      id: crypto.randomUUID(),
      user_id: user.id,
      hash_token: hashToken(hashString),
      created_at: new Date(),
      expires_at: new Date(now.setHours(now.getHours() + time * 24)),
      revoked: false,
      revoked_at: null,
    };
  }

  private async addFailAttempt(userId: string): Promise<void> {
    await this.userService.addLoginFailAttempt(userId);
  }

  private async setMustChangePassword(userId: string): Promise<void> {
    await this.userService.resetPasswordFailsAttempts(userId);
    await this.userService.setMustChangePassword(userId);
  }
}
