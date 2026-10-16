import {
  IsDate,
  IsObject,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyAddressDTO } from './company.dto';

export class CompanyEntity {
  @IsUUID()
  id?: string;
  @IsString()
  @Length(14, 14)
  cnpj: string;
  @IsString()
  @MaxLength(15)
  code: string;
  @IsString()
  @MaxLength(100)
  name: string;
  @IsDate()
  @IsObject()
  @ValidateNested()
  @Type(() => CompanyAddressDTO)
  address?: CompanyAddressEntity | null;
  created_at: Date;
  @IsDate()
  updated_at?: Date | null;
}

export class CompanyAddressEntity {
  @IsUUID()
  id?: string;
  @IsUUID()
  company_id?: string;
  @IsString()
  @Length(8, 8)
  cep: string;
  @IsString()
  @MaxLength(150)
  street: string;
  @IsString()
  @MaxLength(100)
  neighborhood: string;
  @IsString()
  @MaxLength(100)
  city: string;
  @IsString()
  @MaxLength(50)
  state: string;
  @IsString()
  @Length(2, 2)
  uf: string;
  @IsString()
  number: string;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at?: Date | null;
}
