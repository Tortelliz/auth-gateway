import { Injectable } from '@nestjs/common';
import { FullUserEntity } from './user.entity';
import { UpdateUserDto, UserDto } from './user.dto';
import { RoleService } from '../role/services/role.service';

@Injectable()
export class UserMapper {
  constructor(private readonly roleService: RoleService) {}

  async fromEntityToDto(user: FullUserEntity): Promise<UserDto> {
    const roles = await this.roleService.findByUserId(user.id);
    return {
      id: user.id,
      company_id: user.company_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      first_access: user.first_access,
      must_email_verification: user.must_email_verification,
      first_access_at: user.first_access_at,
      last_email_verification_at: user.last_email_verification_at,
      last_login_at: user.last_login_at,
      created_at: user.created_at,
      updated_at: user.updated_at,
      roles: roles.map((role) => ({
        role,
      })),
    };
  }

  async fromEntityToUpdateDto(user: FullUserEntity): Promise<UpdateUserDto> {
    const roles = await this.roleService.findByUserId(user.id);
    return {
      company_id: user.company_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      roles: roles.map((role) => role.id),
    };
  }
}
