import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../../users/users.service';

// ✅ Extend Express Request to include currentUser
interface CustomRequest extends Request {
  currentUser?: any; // Replace 'any' with 'UserEntity' if available
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    // ✅ Use CustomRequest here
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // No token, move to next middleware
    }

    try {
      const token = authHeader.split(' ')[1];

      if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('Missing ACCESS_TOKEN_SECRET in environment variables');
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
        id: string;
      };
      const user = await this.userService.findOne(Number(decoded.id));
      if (user) {
        req.currentUser = user; // ✅ Now TypeScript will recognize this
      }
    } catch (error) {
      console.error('JWT Verification Error:', error);
    }

    next();
  }
}
