import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CompanyAddressDTO {
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

export class CompanyDTO {
  @IsString()
  cnpj: string;
  @IsString()
  @MaxLength(15)
  code: string;
  @IsString()
  @MaxLength(100)
  name: string;
  @IsObject()
  @ValidateNested()
  @Type(() => CompanyAddressDTO)
  address?: CompanyAddressDTO | null;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at?: Date | null;
}

export class CreateCompanyAddressDTO {
  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  cep: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  street: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  neighborhood: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  city: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  state: string;
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  uf: string;
  @IsNotEmpty()
  @IsString()
  number: string;
}

export class CreateCompanyDTO {
  @IsNotEmpty()
  @IsString()
  cnpj: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  code: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateCompanyAddressDTO)
  address: CreateCompanyAddressDTO;
}

export class UpdateCompanyDTO extends CreateCompanyDTO {}
