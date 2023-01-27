import { Product } from '@prisma/client';
import { UpdateProductDTO } from 'src/app/product/dtos/update-product-dto';
import { ProductRepository } from 'src/app/product/repositories/product.repository';

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = [];

  async create(createProduct: Product): Promise<void> {
    this.products.push(createProduct);
  }

  async update(id: string, updateProduct: UpdateProductDTO): Promise<void> {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex >= 0) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updateProduct,
      };
    }
  }

  async delete(id: string): Promise<void> {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex >= 0) {
      this.products.splice(productIndex, 1);
    }
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      return null;
    }

    return product;
  }
}
