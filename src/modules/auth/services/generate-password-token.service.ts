import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { PasswordTokenEntity } from '../../../../generated/prisma/client';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';
import { hashToken } from '../../../utils/hash-token.util';
import { ConfigService } from '@nestjs/config';
import { generateRandomTokenUtil } from '../../../utils/generate-random-token.util';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class GeneratePasswordTokenService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async execute(userId: string): Promise<{ token: string }> {
    const user = await this.userService.findOneById(userId);
    const token = generateRandomTokenUtil();
    await this.authRepository.createPasswordToken(this.build(user.id, token));
    return { token };
  }

  private build(userId: string, rawToken: string): PasswordTokenEntity {
    const tokenExpiresInMinutes = this.configService.getOrThrow<number>(
      'PASSWORD_TOKEN_EXPIRES_IN_MINUTES',
    );
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setMinutes(expiresAt.getMinutes() + tokenExpiresInMinutes);
    return {
      id: generateUUIDUtil(),
      user_id: userId,
      hash_token: hashToken(rawToken),
      revoked: false,
      created_at: now,
      expires_at: expiresAt,
      revoked_at: null,
    };
  }
}
