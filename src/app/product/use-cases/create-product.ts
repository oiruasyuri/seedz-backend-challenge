import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateProductDTO } from '../dtos/create-product-dto';
import { ProductRepository } from '../repositories/product.repository';
import { AmountIsRequired } from './errors/amount-is-required';
import { NameIsRequired } from './errors/name-is-required';
import { PriceIsRequired } from './errors/price-is-required';

@Injectable()
export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ name, amount, price }: CreateProductDTO): Promise<void> {
    if (!name) throw new NameIsRequired();
    if (!amount) throw new AmountIsRequired();
    if (!price) throw new PriceIsRequired();

    const product = { id: randomUUID(), name, amount, price };

    await this.productRepository.create(product);
  }
}
