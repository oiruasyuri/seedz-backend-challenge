import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ReadProduct } from 'src/app/product/use-cases/read-product';
import { UpdateProduct } from 'src/app/product/use-cases/update-product';
import { CreateSaleDTO } from '../dtos/create-sale-dto';
import { SaleRepository } from '../repositories/sale-repository';
import { InternalServerError } from './errors/internal-server-error';
import { ProductAmountIsRequired } from './errors/product-amount-is-required';
import { ProductAmountNotAvailable } from './errors/product-amount-not-available';
import { ProductIdIsRequired } from './errors/product-id-is-required';

@Injectable()
export class CreateSale {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly readProduct: ReadProduct,
    private readonly updateProduct: UpdateProduct,
  ) {}

  async execute({
    user_id: sale_user_id,
    product_id: sale_product_id,
    product_amount: sale_product_amount,
  }: CreateSaleDTO): Promise<void> {
    if (!sale_product_id) throw new ProductIdIsRequired();
    if (!sale_product_amount) throw new ProductAmountIsRequired();

    const product = await this.readProduct.execute(sale_product_id);

    if (product.amount < sale_product_amount) {
      console.log({ amount: product.amount, sale_product_amount });
      throw new ProductAmountNotAvailable();
    }

    const updateProductData = {
      amount: product.amount - sale_product_amount,
    };

    const sale_total_price = sale_product_amount * product.price;

    const sale = {
      id: randomUUID(),
      user_id: sale_user_id,
      product_id: sale_product_id,
      product_amount: sale_product_amount,
      total_price: sale_total_price,
    };

    try {
      await this.saleRepository.create(sale);
      await this.updateProduct.execute(sale_product_id, updateProductData);
    } catch (error) {
      throw new InternalServerError();
    }
  }
}
