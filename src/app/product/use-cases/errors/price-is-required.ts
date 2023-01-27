import { HttpException, HttpStatus } from '@nestjs/common';

export class PriceIsRequired extends HttpException {
  constructor() {
    super('Price is required', HttpStatus.BAD_REQUEST);
  }
}
