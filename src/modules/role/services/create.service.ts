import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { CreateRoleDto, RoleDto } from '../role.dto';
import { RoleEntity } from '../../../../generated/prisma/client';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';
import { CompanyService } from '../../company/services/company.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class CreateService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly companyService: CompanyService,
  ) {}

  async execute(role: CreateRoleDto): Promise<RoleDto> {
    await this.checkCompany(role.company_id);
    return await this.roleRepository.create(this.build(role));
  }

  private build(role: CreateRoleDto): RoleEntity {
    return {
      id: generateUUIDUtil(),
      company_id: role.company_id,
      code: role.code,
      name: role.name,
      description: role.description,
      created_at: new Date(),
      updated_at: null,
    };
  }

  private async checkCompany(companyId: string): Promise<void> {
    try {
      await this.companyService.findOne(companyId);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Invalid company');
      }
      throw error;
    }
  }
}
