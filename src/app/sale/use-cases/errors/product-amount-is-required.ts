import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductAmountIsRequired extends HttpException {
  constructor() {
    super('Product amount is required', HttpStatus.BAD_REQUEST);
  }
}
