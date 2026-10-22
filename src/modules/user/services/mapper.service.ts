import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { UserDTO } from '../user.dto';
import { RoleDTO } from '../../role/role.dto';
import { CompanyDTO } from '../../company/company.dto';

@Injectable()
export class MapperService {
  static fromEntityToDTO(
    user: UserEntity,
    roles: RoleDTO[],
    company: CompanyDTO,
  ): UserDTO {
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      active: user.active,
      last_login_at: user.last_login_at,
      failed_login_attempts: user.failed_login_attempts,
      must_change_password: user.must_change_password,
      roles: roles.map((item) => ({
        role: {
          ...item,
        },
      })),
      company,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
