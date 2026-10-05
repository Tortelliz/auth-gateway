import { IsString, MaxLength } from 'class-validator';

export class CompanyDTO {
  @IsString()
  cnpj: string;
  @IsString()
  @MaxLength(15)
  code: string;
  @IsString()
  @MaxLength(100)
  name: string;
}
