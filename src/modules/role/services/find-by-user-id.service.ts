import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../role.entity';
import { RoleRepository } from '../role.repository';

@Injectable()
export class FindByUserIdService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<{ role: RoleEntity }[]> {
    return await this.roleRepository.findByUserId(id);
  }
}
