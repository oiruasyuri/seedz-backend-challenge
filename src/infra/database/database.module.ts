import { Module } from '@nestjs/common';
import { ProductRepository } from 'src/app/product/repositories/product.repository';
import { UserRepository } from 'src/app/user/repositories/user-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaProductRepository } from './prisma/repositories/prisma-product.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: ProductRepository, useClass: PrismaProductRepository },
  ],
  exports: [UserRepository, ProductRepository],
})
export class DatabaseModule {}
