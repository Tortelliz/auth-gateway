import { BadRequestException, Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { generateCNPJUtil } from '../../../utils/generate-cnpj.util';
import { generateCEPUtil } from '../../../utils/generate-cep.util';
import { CreateCompanyDTO } from '../company.dto';
import { ExceptionDTO } from '../../../common/filters/exception.dto';

@Injectable()
export class CreateManyTest {
  private readonly path = 'company';
  constructor(private readonly configService: ConfigService) {}

  async execute(): Promise<void> {
    const url = `${this.getURL()}/${this.path}`;
    for (let counter = 0; counter < 200; counter++) {
      const company: CreateCompanyDTO = {
        cnpj: String(generateCNPJUtil()),
        code: faker.string.alpha({ length: 12 }).toLowerCase(),
        name: faker.company.name(),
        address: {
          cep: String(generateCEPUtil()),
          street: faker.location.street(),
          neighborhood: faker.location.city(),
          city: faker.location.city(),
          state: faker.location.state(),
          uf: faker.location.state({ abbreviated: true }),
          number: faker.location.buildingNumber(),
        },
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company),
      });
      if (!res.ok) {
        const data = (await res.json()) as ExceptionDTO;
        throw new BadRequestException(data.error);
      }
    }
  }

  private getURL(): string {
    return this.configService.getOrThrow<string>('TEST_URL');
  }
}
