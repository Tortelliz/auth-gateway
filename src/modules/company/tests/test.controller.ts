import { Controller, Post } from '@nestjs/common';
import { CreateManyTest } from './create-many.test';

@Controller('company/test')
export class CompanyTestController {
  constructor(private readonly createManyTest: CreateManyTest) {}

  @Post('create-many')
  async createMany(): Promise<any> {
    await this.createManyTest.execute();
    return {
      message: 'Companies created successfully',
    };
  }
}
