import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordIsRequired extends HttpException {
  constructor() {
    super('Password is required', HttpStatus.BAD_REQUEST);
  }
}
