import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserDto } from '../user.dto';
import { UserMapper } from '../user.mapper';

@Injectable()
export class FindOneByIdService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string): Promise<UserDto> {
    return await this.userMapper.fromEntityToDto(
      await this.userRepository.findById(id),
    );
  }
}
