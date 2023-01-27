import { Sale } from '@prisma/client';

export abstract class SaleRepository {
  abstract create(createSale: Sale): Promise<void>;
  abstract delete(id: string): Promise<void>;

  abstract findById(id: string): Promise<Sale | null>;
}
