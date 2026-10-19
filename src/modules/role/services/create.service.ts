import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { CreateRoleDTO, RoleDTO } from '../role.dto';
import { RoleEntity } from '../role.entity';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';

@Injectable()
export class CreateService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(role: CreateRoleDTO): Promise<RoleDTO> {
    const builtRole = this.build(role);
    return await this.roleRepository.create(builtRole);
  }

  private build(role: CreateRoleDTO): RoleEntity {
    return {
      ...role,
      id: generateUUIDUtil(),
      created_at: new Date(),
      updated_at: null,
    };
  }
}
