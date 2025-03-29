import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log('🔍 CurrentUser Decorator - Executing...');

    const request = ctx.switchToHttp().getRequest();
    console.log(
      '🔍 CurrentUser Decorator - request.currentUser:',
      request.currentUser,
    );

    return request.currentUser || null; // ✅ Ensure it returns `currentUser`, not `request.user`
  },
);
