import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { ProductNotFound } from './errors/product-not-found';

@Injectable()
export class DeleteProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const productExists = await this.productRepository.findById(id);

    if (!productExists) throw new ProductNotFound();

    await this.productRepository.delete(id);
  }
}
