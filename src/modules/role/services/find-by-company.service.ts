import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { RoleDto } from '../role.dto';

@Injectable()
export class FindByCompanyService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(companyId: string): Promise<RoleDto[]> {
    return await this.roleRepository.findByCompanyId(companyId);
  }
}
