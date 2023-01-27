import { Product } from '@prisma/client';
import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { DeleteProduct } from './delete-product';
import { ProductNotFound } from './errors/product-not-found';

describe('delete product', () => {
  let productRepository: InMemoryProductRepository;
  let deleteProduct: DeleteProduct;
  let product: Product;

  beforeAll(() => {
    productRepository = new InMemoryProductRepository();
    deleteProduct = new DeleteProduct(productRepository);

    product = {
      id: 'test-id',
      name: 'Test Name',
      amount: 1,
      price: 9.99,
    };

    productRepository.create(product);
  });

  it('It should be possible to delete a product', async () => {
    await expect(deleteProduct.execute(product.id)).resolves.not.toThrowError();

    expect(productRepository.products).toHaveLength(0);
  });

  it('It should not be possible to delete a non existent product', async () => {
    await expect(deleteProduct.execute(product.id)).rejects.toThrowError(
      ProductNotFound,
    );
  });
});
