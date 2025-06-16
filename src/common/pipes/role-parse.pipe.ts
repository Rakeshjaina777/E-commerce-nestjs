import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class RolePipe implements PipeTransform {
  transform(value: any): Role {
    if (!Object.values(Role).includes(value)) {
      throw new BadRequestException('Invalid role value');
    }
    return value;
  }
}
