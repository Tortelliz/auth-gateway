import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CompanyAddressDto {
  @IsUUID()
  id: string;
  @IsString()
  cep: string;
  @IsString()
  street: string;
  @IsString()
  neighborhood: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsString()
  uf: string;
  @IsString()
  number: string;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date | null;
}

export class CompanyDto {
  @IsUUID()
  id: string;
  @IsString()
  cnpj: string;
  @IsString()
  code: string;
  @IsString()
  name: string;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date | null;
  @IsObject()
  @Type(() => CompanyAddressDto)
  address: CompanyAddressDto | null;
}

export class SetCompanyAddressDto {
  @IsString()
  @Length(8, 8)
  @IsNotEmpty()
  cep: string;
  @IsString()
  @Length(5, 150)
  @IsNotEmpty()
  street: string;
  @IsString()
  @Length(5, 100)
  @IsNotEmpty()
  neighborhood: string;
  @IsString()
  @Length(5, 100)
  @IsNotEmpty()
  city: string;
  @IsString()
  @Length(4, 50)
  @IsNotEmpty()
  state: string;
  @IsString()
  @Length(2, 2)
  @IsNotEmpty()
  uf: string;
  @IsString()
  @Length(1, 15)
  @IsNotEmpty()
  number: string;
}

export class CreateCompanyDto {
  @IsString()
  @Length(14, 14)
  @IsNotEmpty()
  cnpj: string;
  @IsString()
  @Length(3, 15)
  @IsNotEmpty()
  code: string;
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  name: string;
  @IsObject()
  @Type(() => SetCompanyAddressDto)
  @IsNotEmpty()
  address: SetCompanyAddressDto;
}

export class UpdateCompanyDto extends CreateCompanyDto {}
