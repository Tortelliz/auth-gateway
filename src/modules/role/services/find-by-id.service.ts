import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { RoleDTO } from '../role.dto';

@Injectable()
export class FindByIdService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<RoleDTO> {
    return await this.roleRepository.findById(id);
  }
}
