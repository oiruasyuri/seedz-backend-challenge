import { Module } from '@nestjs/common';
import { CreateProduct } from 'src/app/product/use-cases/create-product';
import { DeleteProduct } from 'src/app/product/use-cases/delete-product';
import { ReadProduct } from 'src/app/product/use-cases/read-product';
import { UpdateProduct } from 'src/app/product/use-cases/update-product';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ProductController } from './controllers/product.controller';

@Module({
  controllers: [ProductController],
  providers: [CreateProduct, ReadProduct, UpdateProduct, DeleteProduct],
  imports: [DatabaseModule],
})
export class ProductModule {}
