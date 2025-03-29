import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // No role restriction on this route
    }

    const request = context.switchToHttp().getRequest();
    const user = request.currentUser;

    console.log('🔍 AuthorizationGuard - User:', user);

    // ✅ Convert roles to an array (to handle string cases)
    const userRoles = Array.isArray(user.roles) ? user.roles : [user.roles];

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
