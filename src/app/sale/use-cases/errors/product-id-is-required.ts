import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductIdIsRequired extends HttpException {
  constructor() {
    super('Product id is required', HttpStatus.BAD_REQUEST);
  }
}
