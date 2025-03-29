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

      req.currentUser = null;

      next();
      return;
      
      // No token, move to next middleware
    }
    

    try {
      const token = authHeader.split(' ')[1];

      if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('--------------------------------------Missing ACCESS_TOKEN_SECRET in environment variables');
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
        id: string;


      };
 if (!decoded.id || isNaN(Number(decoded.id))) {
   console.warn('Invalid user ID in token');
   return next();
 }

      const user = await this.userService.findOne(Number(decoded.id));
      if (user) {
        console.log("---------------------------------------------");
        console.log(user);
        console.log('---------------------------------------------');console.log('🛠️ Middleware - Extracted User from Token:', user);
        

        console.log('------------------🛠️ Raw user roles from DB:', user.roles);
        console.log('===--------------🛠️ Type of roles:', typeof user.roles);


        req.currentUser = user; // ✅ Now TypeScript will recognize this
      }
   next();

    } catch (error) {
      console.error('-------------------------------------JWT Verification Error:', error);

      req.currentUser = null;
         next();
    }

 
  }
}
