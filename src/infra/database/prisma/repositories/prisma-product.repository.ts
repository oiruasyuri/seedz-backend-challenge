import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { UpdateProductDTO } from 'src/app/product/dtos/update-product-dto';
import { ProductRepository } from 'src/app/product/repositories/product.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProduct: Product): Promise<void> {
    await this.prisma.product.create({ data: createProduct });
  }

  async update(id: string, updateProduct: UpdateProductDTO): Promise<void> {
    await this.prisma.product.update({ where: { id }, data: updateProduct });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  async findById(id: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({ where: { id } });
  }
}
