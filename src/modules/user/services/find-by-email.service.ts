import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserDTO } from '../user.dto';
import { UserMapper } from '../user.mapper';

@Injectable()
export class FindByEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(email: string): Promise<UserDTO | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    return await this.userMapper.fromEntityToDTO(user);
  }
}
