import { UnauthorizedException } from '@nestjs/common';

export class CustomUnauthorizedException extends UnauthorizedException {
  constructor(message = 'Unauthorized access') {
    super(message);
  }
}
