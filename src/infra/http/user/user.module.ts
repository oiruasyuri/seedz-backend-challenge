import { Module } from '@nestjs/common';
import { CreateUser } from 'src/app/user/use-cases/create-user';
import { DeleteUser } from 'src/app/user/use-cases/delete-user';
import { ReadUser } from 'src/app/user/use-cases/read-user';
import { UpdateUser } from 'src/app/user/use-cases/update-user';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [CreateUser, ReadUser, UpdateUser, DeleteUser],
  imports: [DatabaseModule],
})
export class UserModule {}
