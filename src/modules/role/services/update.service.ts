import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import { RoleDto, UpdateRoleDto } from '../role.dto';
import { RoleEntity } from '../../../../generated/prisma/client';
import { isEqualService } from '../../../lib/lodash/is-equal.service';
import { RoleMapper } from '../role.mapper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { CompanyService } from '../../company/services/company.service';

@Injectable()
export class UpdateService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly companyService: CompanyService,
  ) {}

  async execute(id: string, role: UpdateRoleDto): Promise<RoleDto> {
    const oldRole = await this.roleRepository.findById(id);
    await this.checkCompany(role.company_id);
    this.checkChange(oldRole, role);
    return await this.roleRepository.update(id, this.build(oldRole, role));
  }

  private build(oldRole: RoleEntity, newRole: UpdateRoleDto): RoleEntity {
    return {
      id: oldRole.id,
      company_id: newRole.company_id,
      code: newRole.code,
      name: newRole.name,
      description: newRole.description,
      created_at: oldRole.created_at,
      updated_at: new Date(),
    };
  }

  private checkChange(oldRole: RoleEntity, newRole: UpdateRoleDto): void {
    const isEqual = isEqualService(
      RoleMapper.fromEntityToUpdateDto(oldRole),
      newRole,
    );
    if (isEqual) throw new ForbiddenException('Changes not detected');
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
