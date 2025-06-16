import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entity: string, id?: string) {
    super(`${entity} not found${id ? ` with id ${id}` : ''}`);
  }
}
