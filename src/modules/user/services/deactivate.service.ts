import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserDTO } from '../user.dto';
import { UserMapper } from '../user.mapper';

@Injectable()
export class DeactivateService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string): Promise<UserDTO> {
    const deactivatedUser = await this.userRepository.deactivate(id);
    return await this.userMapper.fromEntityToDTO(deactivatedUser);
  }
}
