import { UserRepository } from '../user.repository';
import { UserDto } from '../user.dto';
import { FullUserEntity } from '../user.entity';
import { UserMapper } from '../user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeactivateService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    return await this.userMapper.fromEntityToDto(
      await this.userRepository.update(id, this.build(user)),
    );
  }

  private build(user: FullUserEntity): FullUserEntity {
    return {
      ...user,
      active: false,
      updated_at: new Date(),
    };
  }
}
