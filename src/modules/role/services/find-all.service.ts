import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { RoleDto } from '../role.dto';

@Injectable()
export class FindAllService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleDto[]>> {
    return await this.roleRepository.findAll(pagination);
  }
}
