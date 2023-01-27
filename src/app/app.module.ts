import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
