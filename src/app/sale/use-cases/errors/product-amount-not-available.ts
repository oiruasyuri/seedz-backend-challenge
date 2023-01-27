import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductAmountNotAvailable extends HttpException {
  constructor() {
    super('Product amount not available', HttpStatus.BAD_REQUEST);
  }
}
