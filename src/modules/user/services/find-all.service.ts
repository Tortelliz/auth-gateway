import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserDto } from '../user.dto';
import { UserMapper } from '../user.mapper';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';

@Injectable()
export class FindAllService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDto[]>> {
    return await this.userRepository.findAll(pagination);
  }
}
