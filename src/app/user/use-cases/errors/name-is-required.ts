import { HttpException, HttpStatus } from '@nestjs/common';

export class NameIsRequired extends HttpException {
  constructor() {
    super('Name is required', HttpStatus.BAD_REQUEST);
  }
}
