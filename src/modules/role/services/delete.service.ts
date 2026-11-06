import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { RoleDto } from '../role.dto';

@Injectable()
export class DeleteService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<RoleDto> {
    return await this.roleRepository.delete(id);
  }
}
