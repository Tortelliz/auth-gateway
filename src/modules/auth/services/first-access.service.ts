import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { UserService } from '../../user/services/user.service';
import { FirstAccessDto } from '../auth.dto';
import { CheckTokenService } from './check-token.service';
import { TokenEntity } from '../../../../generated/prisma/client';

@Injectable()
export class FirstAccessService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly checkTokenService: CheckTokenService,
  ) {}

  async execute(userId: string, data: FirstAccessDto): Promise<void> {
    await this.userService.findOneById(userId);
    const token = await this.checkTokenService.execute(data.token);
    await this.userService.updatePassword(userId, {
      password: data.new_password,
      confirm_password: data.confirm_password,
    });
    await this.authRepository.updateToken(token.id, this.build(token));
    await this.userService.registerFirstAccess(userId);
  }

  private build(entity: TokenEntity): TokenEntity {
    return {
      id: entity.id,
      user_id: entity.user_id,
      hash_token: entity.hash_token,
      revoked: true,
      resource: entity.resource,
      created_at: entity.created_at,
      expires_at: entity.expires_at,
      revoked_at: new Date(),
    };
  }
}
