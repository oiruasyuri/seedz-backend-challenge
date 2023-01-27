import { Product } from '@prisma/client';
import { UpdateProductDTO } from '../dtos/update-product-dto';

export abstract class ProductRepository {
  abstract create(createProduct: Product): Promise<void>;
  abstract update(id: string, updateProduct: UpdateProductDTO): Promise<void>;
  abstract delete(id: string): Promise<void>;

  abstract findById(id: string): Promise<Product | null>;
}
