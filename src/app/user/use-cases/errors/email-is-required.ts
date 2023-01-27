import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailIsRequired extends HttpException {
  constructor() {
    super('Email is required', HttpStatus.BAD_REQUEST);
  }
}
