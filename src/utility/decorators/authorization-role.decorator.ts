import { SetMetadata } from '@nestjs/common';

export const SetRoles = (...roles: string[]) => SetMetadata('roles', roles);
