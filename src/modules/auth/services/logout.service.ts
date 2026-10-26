import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { hashToken } from '../../../utils/hash-token.util';

@Injectable()
export class LogoutService {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string): Promise<boolean> {
    const hashedToken = hashToken(token);
    await this.authRepository.revokeSession(hashedToken);
    return true;
  }
}
