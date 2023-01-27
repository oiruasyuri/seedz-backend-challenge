import { HttpException, HttpStatus } from '@nestjs/common';

export class AmountIsRequired extends HttpException {
  constructor() {
    super('Amount is required', HttpStatus.BAD_REQUEST);
  }
}
