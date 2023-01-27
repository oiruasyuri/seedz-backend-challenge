import { Module } from '@nestjs/common';
import { ReadProduct } from 'src/app/product/use-cases/read-product';
import { UpdateProduct } from 'src/app/product/use-cases/update-product';
import { CreateSale } from 'src/app/sale/use-cases/create-sale';
import { DeleteSale } from 'src/app/sale/use-cases/delete-sale';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SaleController } from './controllers/sale.controller';

@Module({
  controllers: [SaleController],
  providers: [CreateSale, DeleteSale, ReadProduct, UpdateProduct],
  imports: [DatabaseModule],
})
export class SaleModule {}
