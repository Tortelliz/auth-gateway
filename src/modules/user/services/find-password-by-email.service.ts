import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class FindPasswordByEmailService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<{ password: string } | null> {
    return await this.userRepository.findPasswordByEmail(email);
  }
}
