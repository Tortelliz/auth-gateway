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

  async execute(email: string): Promise<UserDTO> {
    const user = await this.userRepository.findByEmail(email);
    return await this.userMapper.fromEntityToDTO(user);
  }
}
