import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { RoleDto } from '../role.dto';

@Injectable()
export class FindByUserService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(userId: string): Promise<RoleDto[]> {
    return await this.roleRepository.findByUserId(userId);
  }
}
