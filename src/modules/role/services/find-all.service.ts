import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { RoleDTO } from '../role.dto';

@Injectable()
export class FindAllService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(): Promise<RoleDTO[]> {
    return await this.roleRepository.findAll();
  }
}
