import { UserEntity, UserRoleEntity } from '../../../generated/prisma/client';

export type FullUserEntity = UserEntity & {
  roles: UserRoleEntity[];
};
