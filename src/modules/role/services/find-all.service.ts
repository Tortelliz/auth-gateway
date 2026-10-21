import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { RoleDTO } from '../role.dto';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';

@Injectable()
export class FindAllService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleDTO[]>> {
    return await this.roleRepository.findAll(pagination);
  }
}
