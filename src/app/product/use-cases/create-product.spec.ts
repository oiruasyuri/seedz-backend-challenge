import { InMemoryProductRepository } from '../../../../test/repositories/in-memory-product-repository';
import { CreateProduct } from './create-product';
import { AmountIsRequired } from './errors/amount-is-required';
import { NameIsRequired } from './errors/name-is-required';
import { PriceIsRequired } from './errors/price-is-required';

describe('create product', () => {
  let productRepository: InMemoryProductRepository;
  let createProduct: CreateProduct;

  beforeAll(() => {
    productRepository = new InMemoryProductRepository();
    createProduct = new CreateProduct(productRepository);
  });

  it('It should not be possible to create a product without name', async () => {
    const product = {
      name: '',
      amount: 1,
      price: 9.99,
    };

    await expect(createProduct.execute(product)).rejects.toThrowError(
      NameIsRequired,
    );
  });

  it('It should not be possible to create a product without amount', async () => {
    const product = {
      name: 'Test Name',
      amount: 0,
      price: 9.99,
    };

    await expect(createProduct.execute(product)).rejects.toThrowError(
      AmountIsRequired,
    );
  });

  it('It should not be possible to create a product without price', async () => {
    const product = {
      name: 'Test Name',
      amount: 1,
      price: 0,
    };

    await expect(createProduct.execute(product)).rejects.toThrowError(
      PriceIsRequired,
    );
  });

  it('It should be possible to create a product', async () => {
    const product = {
      name: 'Test Name',
      amount: 1,
      price: 9.99,
    };

    await expect(createProduct.execute(product)).resolves.not.toThrowError();

    expect(productRepository.products[0].id).toBeDefined();
    expect(productRepository.products[0].name).toEqual(product.name);
    expect(productRepository.products[0].amount).toEqual(product.amount);
    expect(productRepository.products[0].price).toEqual(product.price);
  });
});
