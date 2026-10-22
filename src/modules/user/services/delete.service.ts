import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserDTO } from '../user.dto';
import { MapperService } from './mapper.service';
import { CompanyService } from '../../company/services/company.service';
import { RoleService } from '../../role/services/role.service';

@Injectable()
export class DeleteService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyService: CompanyService,
    private readonly roleService: RoleService,
  ) {}

  async execute(id: string): Promise<UserDTO> {
    const user = await this.userRepository.delete(id);
    const roles = await Promise.all(
      user.roles.map(
        async (item) => await this.roleService.findById(item.role_id),
      ),
    );
    const company = await this.companyService.findById(user.company_id);
    return MapperService.fromEntityToDTO(user, roles, company);
  }
}
