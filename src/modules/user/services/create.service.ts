import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UserDTO } from '../user.dto';
import { UserEntity, UserRoleEntity } from '../user.entity';
import { generateRandomPasswordService } from '../../../lib/bcrypt/generate-random-password.service';
import { RoleService } from '../../role/services/role.service';
import { UserRepository } from '../user.repository';
import { RoleDTO } from '../../role/role.dto';
import { UserMapper } from '../user.mapper';

@Injectable()
export class CreateService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(user: CreateUserDTO): Promise<UserDTO> {
    const userId = crypto.randomUUID();
    const userRoles = await this.getUserRoles(userId, user);
    const builtUser: UserEntity = await this.build(
      userId,
      user,
      userRoles.entity,
    );
    const createdUser = await this.userRepository.create(builtUser);
    return await this.userMapper.fromEntityToDTO(createdUser);
  }

  private async build(
    userId: string,
    user: CreateUserDTO,
    roles: UserRoleEntity[],
  ): Promise<UserEntity> {
    const { role_ids, ...rest } = user;
    return {
      ...rest,
      id: userId,
      password: await generateRandomPasswordService(),
      active: true,
      last_login_at: null,
      failed_login_attempts: 0,
      must_change_password: true,
      created_at: new Date(),
      updated_at: null,
      roles,
    };
  }

  private async getUserRoles(
    userId: string,
    user: CreateUserDTO,
  ): Promise<{
    entity: UserRoleEntity[];
    dto: RoleDTO[];
  }> {
    const roles: RoleDTO[] = await Promise.all(
      user.role_ids.map(async (item) => {
        return await this.roleService.findById(item);
      }),
    );
    return {
      entity: roles.map((item) => ({
        id: crypto.randomUUID(),
        user_id: userId,
        role_id: item.id,
        created_at: item.created_at,
        updated_at: new Date(),
      })),
      dto: roles,
    };
  }
}
