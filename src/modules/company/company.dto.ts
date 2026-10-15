import { IsDate, IsString, MaxLength } from 'class-validator';

export class CompanyDTO {
  @IsString()
  cnpj: string;
  @IsString()
  @MaxLength(15)
  code: string;
  @IsString()
  @MaxLength(100)
  name: string;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at?: Date | null;
}

export class CreateCompanyDTO {
  @IsString()
  cnpj: string;
  @IsString()
  @MaxLength(15)
  code: string;
  @IsString()
  @MaxLength(100)
  name: string;
}

export class UpdateCompanyDTO extends CreateCompanyDTO {}
