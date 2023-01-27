import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailInUse extends HttpException {
  constructor() {
    super('Email in use', HttpStatus.CONFLICT);
  }
}
