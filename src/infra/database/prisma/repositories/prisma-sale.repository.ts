import { Injectable } from '@nestjs/common';
import { Sale } from '@prisma/client';
import { SaleRepository } from 'src/app/sale/repositories/sale-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaSaleRepository implements SaleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSale: Sale): Promise<void> {
    await this.prisma.sale.create({ data: createSale });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.sale.delete({ where: { id } });
  }

  async findById(id: string): Promise<Sale | null> {
    return await this.prisma.sale.findUnique({ where: { id } });
  }
}
