import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const AuthorizationGuard = (
  requiredRoles: string[],
): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.currentUser;

      console.log('🔍 AuthorizationGuard - User:', user);

      // ✅ Convert roles to an array (to handle both string & array cases)
      const userRoles = Array.isArray(user?.roles) ? user.roles : [user?.roles];

      console.log('✅ Processed User Roles:', userRoles);

      // ✅ Check if user has at least one required role
      if (!user || !userRoles.some((role) => requiredRoles.includes(role))) {
        console.log('🚨 Access Denied');
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }

      return true;
    }
  }

  return RoleGuardMixin;
};
