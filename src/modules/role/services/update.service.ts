import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { RoleDto, UpdateRoleDto } from '../role.dto';
import { RoleEntity } from '../../../../generated/prisma/client';
import { isEqualService } from '../../../lib/lodash/is-equal.service';

@Injectable()
export class UpdateService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string, role: UpdateRoleDto): Promise<RoleDto> {
    const oldRole = await this.roleRepository.findById(id);
    this.checkChange(oldRole, role);
    return await this.roleRepository.update(id, this.build(oldRole, role));
  }

  private build(oldRole: RoleEntity, newRole: UpdateRoleDto): RoleEntity {
    return {
      id: oldRole.id,
      code: newRole.code,
      name: newRole.name,
      description: newRole.description,
      created_at: oldRole.created_at,
      updated_at: new Date(),
    };
  }

  private checkChange(oldRole: RoleEntity, newRole: UpdateRoleDto): void {
    const { id, created_at, updated_at, ...rest } = oldRole;
    const isEqual = isEqualService(newRole, rest);
    if (isEqual) throw new ForbiddenException('Changes not detected');
  }
}
