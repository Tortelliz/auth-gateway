import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { CreateUserDto, UpdateUserDto, UserDto } from '../user.dto';
import { FullUserEntity } from '../user.entity';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';
import { RoleService } from '../../role/services/role.service';
import { UserMapper } from '../user.mapper';
import { isEqualService } from '../../../lib/lodash/is-equal.service';

@Injectable()
export class UpdateService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string, user: CreateUserDto): Promise<UserDto> {
    const oldUser = await this.userRepository.findById(id);
    await this.checkChange(oldUser, user);
    await this.checkRoles(user.roles);
    return await this.userMapper.fromEntityToDto(
      await this.userRepository.update(id, this.build(oldUser, user)),
    );
  }

  private build(
    oldUser: FullUserEntity,
    newUser: UpdateUserDto,
  ): FullUserEntity {
    const now = new Date();
    const roles = newUser.roles.map((item) => ({
      id: generateUUIDUtil(),
      user_id: oldUser.id,
      role_id: item,
      created_at: now,
      updated_at: null,
    }));
    return {
      id: oldUser.id,
      company_id: newUser.company_id,
      email: newUser.email,
      password: oldUser.password,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      active: oldUser.active,
      last_login_at: oldUser.last_login_at,
      failed_login_attempts: oldUser.failed_login_attempts,
      must_change_password: oldUser.must_change_password,
      created_at: oldUser.created_at,
      updated_at: now,
      roles,
    };
  }
  private async checkChange(
    oldUser: FullUserEntity,
    newUser: UpdateUserDto,
  ): Promise<void> {
    const isEqual = isEqualService(
      await this.userMapper.fromEntityToUpdateDto(oldUser),
      newUser,
    );
    if (isEqual) throw new ForbiddenException('Changes not detected');
  }

  private async checkRoles(roleIds: string[]): Promise<void> {
    try {
      for (const roleId of roleIds) {
        await this.roleService.findOne(roleId);
      }
    } catch (error) {
      if (error.code && error.code === 'P2025')
        throw new ForbiddenException('Invalid role');
      throw error;
    }
  }
}
