import { Product } from '@prisma/client';
import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { ProductNotFound } from './errors/product-not-found';
import { ReadProduct } from './read-product';

describe('read product', () => {
  let productRepository: InMemoryProductRepository;
  let readProduct: ReadProduct;
  let product: Product;

  beforeAll(() => {
    productRepository = new InMemoryProductRepository();
    readProduct = new ReadProduct(productRepository);

    product = {
      id: 'test-id',
      name: 'Test Name',
      amount: 1,
      price: 9.99,
    };
  });

  it('It should not be possible to read a non existent product', async () => {
    await expect(readProduct.execute(product.id)).rejects.toThrowError(
      ProductNotFound,
    );
  });

  it('It should be possible to read a product', async () => {
    await productRepository.create(product);

    await expect(readProduct.execute(product.id)).resolves.toEqual(product);
  });
});
