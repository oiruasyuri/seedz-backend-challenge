import { Injectable } from '@nestjs/common';
import { UpdateProductDTO } from '../dtos/update-product-dto';
import { ProductRepository } from '../repositories/product.repository';
import { NameIsRequired } from './errors/name-is-required';
import { PriceIsRequired } from './errors/price-is-required';
import { ProductNotFound } from './errors/product-not-found';

@Injectable()
export class UpdateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, updateProduct: UpdateProductDTO): Promise<void> {
    if (updateProduct.hasOwnProperty('name') && !updateProduct.name)
      throw new NameIsRequired();

    if (updateProduct.hasOwnProperty('price') && !updateProduct.price)
      throw new PriceIsRequired();

    const productExists = await this.productRepository.findById(id);

    if (!productExists) throw new ProductNotFound();

    await this.productRepository.update(id, { amount: 0, ...updateProduct });
  }
}
