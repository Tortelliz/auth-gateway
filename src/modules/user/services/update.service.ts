import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { UpdateUserDTO, UserDTO } from '../user.dto';
import { UserEntity, UserRoleEntity } from '../user.entity';
import { RoleService } from '../../role/services/role.service';
import { UserRepository } from '../user.repository';
import { RoleDTO } from '../../role/role.dto';
import { CompanyService } from '../../company/services/company.service';
import { CompanyDTO } from '../../company/company.dto';
import { MapperService } from './mapper.service';

@Injectable()
export class UpdateService {
  private readonly logger = new Logger(UpdateService.name);
  constructor(
    private readonly roleService: RoleService,
    private readonly companyService: CompanyService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, user: UpdateUserDTO): Promise<UserDTO> {
    const oldUser = await this.userRepository.findById(id);
    const isChange = this.checkIsChange(oldUser, user);
    if (!isChange) throw new ForbiddenException('Changes not detected');
    const company: CompanyDTO = await this.companyService.findById(
      user.company_id,
    );
    const userRoles = await this.getUserRoles(id, user);
    const builtUser = this.build(oldUser, user, userRoles.entity);
    const updatedUser = await this.userRepository.update(id, builtUser);
    return MapperService.fromEntityToDTO(updatedUser, userRoles.dto, company);
  }

  private build(
    oldUser: UserEntity,
    newUser: UpdateUserDTO,
    userRoles: UserRoleEntity[],
  ): UserEntity {
    const { role_ids, ...rest } = newUser;
    return {
      ...rest,
      id: oldUser.id,
      password: oldUser.password,
      active: oldUser.active,
      last_login_at: oldUser.last_login_at,
      failed_login_attempts: oldUser.failed_login_attempts,
      must_change_password: oldUser.must_change_password,
      created_at: oldUser.created_at,
      updated_at: new Date(),
      roles: userRoles,
    };
  }

  private async getUserRoles(
    userId: string,
    user: UpdateUserDTO,
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
      entity: roles.map((role) => ({
        id: crypto.randomUUID(),
        role_id: role.id,
        user_id: userId,
        created_at: new Date(),
        updated_at: null,
      })),
      dto: roles,
    };
  }

  private checkIsChange(oldUser: UserEntity, newUser: UpdateUserDTO): boolean {
    const mappedOldUser: UpdateUserDTO = {
      email: oldUser.email,
      first_name: oldUser.first_name,
      last_name: oldUser.last_name,
      company_id: oldUser.company_id,
      role_ids: oldUser.roles.map((item) => {
        return item.role_id;
      }),
    };
    return JSON.stringify(mappedOldUser) !== JSON.stringify(newUser);
  }
}
