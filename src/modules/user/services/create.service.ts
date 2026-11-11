import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { CreateUserDto, UserDto } from '../user.dto';
import { FullUserEntity } from '../user.entity';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';
import { generateRandomStringService } from '../../../lib/faker/generate-random-string.service';
import { hashService } from '../../../lib/bcrypt/hash.service';
import { RoleService } from '../../role/services/role.service';
import { UserMapper } from '../user.mapper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class CreateService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(user: CreateUserDto): Promise<UserDto> {
    await this.checkRoles(user.roles);
    return await this.userMapper.fromEntityToDto(
      await this.userRepository.create(await this.build(user)),
    );
  }

  private async build(user: CreateUserDto): Promise<FullUserEntity> {
    const now = new Date();
    const userId = generateUUIDUtil();
    const roles = user.roles.map((item) => ({
      id: generateUUIDUtil(),
      user_id: userId,
      role_id: item,
      created_at: now,
      updated_at: null,
    }));
    return {
      id: userId,
      company_id: user.company_id,
      email: user.email,
      password: await hashService(generateRandomStringService()),
      first_name: user.first_name,
      last_name: user.last_name,
      active: true,
      must_change_password: true,
      first_access: true,
      must_email_verification: false,
      failed_login_attempts: 0,
      created_at: now,
      updated_at: null,
      first_access_at: null,
      last_login_at: null,
      last_email_verification_at: null,
      roles,
    };
  }

  private async checkRoles(roleIds: string[]): Promise<void> {
    try {
      for (const roleId of roleIds) {
        await this.roleService.findOne(roleId);
      }
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new ForbiddenException('Invalid role');
      throw error;
    }
  }
}
