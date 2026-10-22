import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserDTO } from '../user.dto';
import { MapperService } from './mapper.service';
import { CompanyService } from '../../company/services/company.service';
import { RoleService } from '../../role/services/role.service';

@Injectable()
export class FindByEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyService: CompanyService,
    private readonly roleService: RoleService,
  ) {}

  async execute(email: string): Promise<UserDTO> {
    const user = await this.userRepository.findByEmail(email);
    const roles = await Promise.all(
      user.roles.map(async (item) => await this.roleService.findById(item.id)),
    );
    const company = await this.companyService.findById(user.company_id);
    return MapperService.fromEntityToDTO(user, roles, company);
  }
}
