import { Product } from '@prisma/client';
import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { NameIsRequired } from './errors/name-is-required';
import { PriceIsRequired } from './errors/price-is-required';
import { ProductNotFound } from './errors/product-not-found';
import { UpdateProduct } from './update-product';

describe('update product', () => {
  let productRepository: InMemoryProductRepository;
  let updateProduct: UpdateProduct;
  let product: Product;

  beforeAll(() => {
    productRepository = new InMemoryProductRepository();
    updateProduct = new UpdateProduct(productRepository);

    product = {
      id: 'test-id',
      name: 'Test Name',
      amount: 1,
      price: 9.99,
    };

    productRepository.create(product);
  });

  it('It should not be possible to submit blank product name', async () => {
    const productUpdate = { name: '' };

    await expect(
      updateProduct.execute(product.id, productUpdate),
    ).rejects.toThrowError(NameIsRequired);
  });

  it('It should not be possible to submit blank product price', async () => {
    const productUpdate = { price: 0 };

    await expect(
      updateProduct.execute(product.id, productUpdate),
    ).rejects.toThrowError(PriceIsRequired);
  });

  it('It should be possible to update the product name, amount and price', async () => {
    const productUpdate = { name: 'Example Name', amount: 5, price: 1.99 };

    await expect(
      updateProduct.execute(product.id, productUpdate),
    ).resolves.not.toThrowError();

    expect(productRepository.products[0].id).toEqual(product.id);
    expect(productRepository.products[0].name).toEqual(productUpdate.name);
    expect(productRepository.products[0].amount).toEqual(productUpdate.amount);
    expect(productRepository.products[0].price).toEqual(productUpdate.price);
  });

  it('It should not be possible to update a non existent product', async () => {
    const id = 'example-id';
    const productUpdate = { name: 'Example Name', amount: 5, price: 1.99 };

    await expect(updateProduct.execute(id, productUpdate)).rejects.toThrowError(
      ProductNotFound,
    );
  });
});
