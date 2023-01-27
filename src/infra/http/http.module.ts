import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, ProductModule, SaleModule],
})
export class HttpModule {}
