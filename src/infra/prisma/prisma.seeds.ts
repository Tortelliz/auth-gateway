import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { generateUUIDUtil } from '../../utils/generate-uuid.util';
import {
  CompanyEntity,
  RoleEntity,
  UserEntity,
} from '../../../generated/prisma/client';
import { hashService } from '../../lib/bcrypt/hash.service';
import { generateRandomStringService } from '../../lib/faker/generate-random-string.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaSeeds implements OnModuleInit {
  private readonly logger = new Logger(PrismaSeeds.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    const run = this.configService.getOrThrow<'true' | 'false'>('DB_SEEDS_RUN');
    this.logger.log(`Run seeds: ${run}`);
    if (run === 'true') await this.execute();
  }

  private async execute(): Promise<void> {
    const isEmpty = await this.checkEmptyTables();
    if (isEmpty) {
      const company = await this.createCompany();
      const role = await this.createRole();
      await this.createUser(
        company.id,
        role.map((item) => item.id),
      );
      this.logger.warn(
        'The seeds have been applied to the database, please verify',
      );
    }
    if (!isEmpty)
      this.logger.error(
        'The seeds were not applied to the database, please delete all data from all tables and try again.',
      );
  }

  private async createCompany(): Promise<CompanyEntity> {
    return await this.prismaService.companyEntity.create({
      data: {
        id: generateUUIDUtil(),
        cnpj: '67565762000106',
        code: 'grafcet',
        name: 'Grafcet Soluções Tecnológicas',
        created_at: new Date(),
        updated_at: null,
      },
    });
  }

  private async createRole(): Promise<RoleEntity[]> {
    return await this.prismaService.roleEntity.createManyAndReturn({
      data: [
        {
          id: generateUUIDUtil(),
          code: 'admin',
          name: 'Administrator',
          description: 'Grafcet devs',
          created_at: new Date(),
          updated_at: null,
        },
        {
          id: generateUUIDUtil(),
          code: 'staff',
          name: 'Staff',
          description: 'Client staffs',
          created_at: new Date(),
          updated_at: null,
        },
        {
          id: generateUUIDUtil(),
          code: 'operator',
          name: 'Operator',
          description: 'Client operators',
          created_at: new Date(),
          updated_at: null,
        },
        {
          id: generateUUIDUtil(),
          code: 'viewer',
          name: 'Viewer',
          description: 'System view only',
          created_at: new Date(),
          updated_at: null,
        },
      ],
    });
  }

  private async createUser(
    companyId: string,
    roleIds: string[],
  ): Promise<UserEntity> {
    const user = await this.prismaService.userEntity.create({
      data: {
        id: generateUUIDUtil(),
        created_at: new Date(),
        updated_at: null,
        company_id: companyId,
        email: 'rayan@grafcet.com.br',
        password: await hashService(generateRandomStringService()),
        first_name: 'Rayan',
        last_name: 'Tortelli',
        active: true,
        must_change_password: true,
        must_email_verification: false,
        first_access: true,
        failed_login_attempts: 0,
        first_access_at: null,
        last_email_verification_at: null,
        last_login_at: null,
      },
    });
    await Promise.all(
      roleIds.map(async (roleId) => {
        await this.prismaService.userRoleEntity.create({
          data: {
            id: generateUUIDUtil(),
            user_id: user.id,
            role_id: roleId,
            created_at: new Date(),
            updated_at: null,
          },
        });
      }),
    );
    return user;
  }

  private async checkEmptyTables(): Promise<boolean> {
    const counts = [
      {
        table: 'company',
        count: await this.prismaService.companyEntity.count(),
      },
      {
        table: 'role',
        count: await this.prismaService.roleEntity.count(),
      },
      {
        table: 'user',
        count: await this.prismaService.userEntity.count(),
      },
      {
        table: 'user_role',
        count: await this.prismaService.userRoleEntity.count(),
      },
    ];
    let result = true;
    for (const item of counts) {
      if (item.count != 0) {
        this.logger.error(`The ${item.table} table is not empty`);
        result = false;
      }
    }
    return result;
  }
}
