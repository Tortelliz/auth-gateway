import { Injectable } from '@nestjs/common';
import { CreateService } from './create.service';
import { CreateUserDto, UpdateUserDto, UserDto } from '../user.dto';
import { UpdateService } from './update.service';
import { DeleteService } from './delete.service';
import { FindOneByIdService } from './find-one-by-id.service';
import { FindOneByEmailService } from './find-one-by-email.service';
import { FindAllService } from './find-all.service';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
    private readonly findOneByIdService: FindOneByIdService,
    private readonly findOneByEmailService: FindOneByEmailService,
    private readonly findAllService: FindAllService,
  ) {}

  async create(user: CreateUserDto): Promise<UserDto> {
    return await this.createService.execute(user);
  }

  async update(id: string, user: UpdateUserDto): Promise<UserDto> {
    return await this.updateService.execute(id, user);
  }

  async delete(id: string): Promise<UserDto> {
    return await this.deleteService.execute(id);
  }

  async findOneById(id: string): Promise<UserDto> {
    return await this.findOneByIdService.execute(id);
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    return await this.findOneByEmailService.execute(email);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDto[]>> {
    return await this.findAllService.execute(pagination);
  }
}
