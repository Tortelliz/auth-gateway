import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { RoleDTO, UpdateRoleDTO } from '../role.dto';
import { RoleEntity } from '../role.entity';

@Injectable()
export class UpdateService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string, role: UpdateRoleDTO): Promise<RoleDTO> {
    const oldRole = await this.roleRepository.findById(id);
    const isChange = this.checkIsChange(oldRole, role);
    if (!isChange) throw new ForbiddenException('Changes not detected');
    const builtRole = this.build(oldRole, role);
    return await this.roleRepository.update(id, builtRole);
  }

  private build(oldRole: RoleEntity, newRole: UpdateRoleDTO): RoleEntity {
    return {
      ...newRole,
      id: oldRole.id,
      created_at: oldRole.created_at,
      updated_at: new Date(),
    };
  }

  private checkIsChange(oldRole: RoleEntity, newRole: UpdateRoleDTO): boolean {
    const mappedRole: UpdateRoleDTO = {
      name: oldRole.name,
      code: oldRole.code,
      description: oldRole.description,
    };
    if (JSON.stringify(mappedRole) === JSON.stringify(newRole)) return false;
    return true;
  }
}
