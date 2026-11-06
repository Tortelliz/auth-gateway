import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../../../generated/prisma/client';
import { UpdateRoleDto } from './role.dto';

@Injectable()
export class RoleMapper {
  static fromEntityToUpdateDto(role: RoleEntity): UpdateRoleDto {
    return {
      code: role.code,
      name: role.name,
      description: role.description,
    };
  }
}
