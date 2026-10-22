import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { UserDTO } from '../user.dto';

@Injectable()
export class FindAllByCompanyIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    companyId: string,
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDTO[]>> {
    return await this.userRepository.findAllByCompanyId(companyId, pagination);
  }
}
