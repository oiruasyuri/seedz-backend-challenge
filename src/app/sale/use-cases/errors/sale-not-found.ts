import { HttpException, HttpStatus } from '@nestjs/common';

export class SaleNotFound extends HttpException {
  constructor() {
    super('Sale not found', HttpStatus.NOT_FOUND);
  }
}
