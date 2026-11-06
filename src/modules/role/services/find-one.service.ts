import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { RoleDto } from '../role.dto';

@Injectable()
export class FindOneService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<RoleDto> {
    return await this.roleRepository.findById(id);
  }
}
