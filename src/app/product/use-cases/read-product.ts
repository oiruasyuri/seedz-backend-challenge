import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/product.repository';
import { ProductNotFound } from './errors/product-not-found';

@Injectable()
export class ReadProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) throw new ProductNotFound();

    return product;
  }
}
