import {
  CompanyAddressEntity,
  CompanyEntity,
} from '../../../generated/prisma/client';

export type FullCompanyEntity = CompanyEntity & {
  address: CompanyAddressEntity | null;
};
