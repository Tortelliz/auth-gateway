import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UserDTO } from '../user.dto';
import { UserEntity, UserRoleEntity } from '../user.entity';
import { generateRandomPasswordService } from '../../../lib/bcrypt/generate-random-password.service';
import { RoleService } from '../../role/services/role.service';
import { UserRepository } from '../user.repository';
import { RoleDTO } from '../../role/role.dto';
import { CompanyService } from '../../company/services/company.service';
import { CompanyDTO } from '../../company/company.dto';
import { MapperService } from './mapper.service';

@Injectable()
export class CreateService {
  constructor(
    private readonly roleService: RoleService,
    private readonly companyService: CompanyService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(user: CreateUserDTO): Promise<UserDTO> {
    const company: CompanyDTO = await this.companyService.findById(
      user.company_id,
    );
    const roles: RoleDTO[] = await Promise.all(
      user.role_ids.map(async (item) => {
        return await this.roleService.findById(item);
      }),
    );
    const userRoles: UserRoleEntity[] = roles.map((item) => ({
      id: crypto.randomUUID(),
      user_id: builtUser.id,
      role_id: item.id,
      created_at: new Date(),
      updated_at: null,
    }));
    const builtUser: UserEntity = {
      ...user,
      id: crypto.randomUUID(),
      password: await generateRandomPasswordService(),
      active: true,
      last_login_at: null,
      failed_login_attempts: 0,
      must_change_password: true,
      created_at: new Date(),
      updated_at: null,
      roles: userRoles,
    };
    const createdUser = await this.userRepository.create(builtUser);
    return MapperService.fromEntityToDTO(createdUser, roles, company);
  }
}
