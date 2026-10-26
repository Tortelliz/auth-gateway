import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';
import { CompanyService } from '../company/services/company.service';
import { RoleService } from '../role/services/role.service';

@Injectable()
export class UserMapper {
  constructor(
    private readonly companyService: CompanyService,
    private readonly roleService: RoleService,
  ) {}

  async fromEntityToDTO(user: UserEntity): Promise<UserDTO> {
    const roles = await this.roleService.findByUserId(user.id);
    const company = await this.companyService.findById(user.company_id);
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      active: user.active,
      last_login_at: user.last_login_at,
      failed_login_attempts: user.failed_login_attempts,
      must_change_password: user.must_change_password,
      roles,
      company,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
