import { Injectable } from '@nestjs/common';
import { SaleRepository } from '../repositories/sale-repository';
import { SaleNotFound } from './errors/sale-not-found';

@Injectable()
export class DeleteSale {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(id: string): Promise<void> {
    const saleExists = await this.saleRepository.findById(id);

    if (!saleExists) throw new SaleNotFound();

    await this.saleRepository.delete(id);
  }
}
