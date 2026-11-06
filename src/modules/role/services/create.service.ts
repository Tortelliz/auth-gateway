import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { CreateRoleDto, RoleDto } from '../role.dto';
import { RoleEntity } from '../../../../generated/prisma/client';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';

@Injectable()
export class CreateService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(role: CreateRoleDto): Promise<RoleDto> {
    return await this.roleRepository.create(this.build(role));
  }

  private build(role: CreateRoleDto): RoleEntity {
    return {
      id: generateUUIDUtil(),
      code: role.code,
      name: role.name,
      description: role.description,
      created_at: new Date(),
      updated_at: null,
    };
  }
}
