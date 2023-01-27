import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/app/user/dtos/create-user-dto';
import { CreateUser } from 'src/app/user/use-cases/create-user';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUser) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUser: CreateUserDTO) {
    await this.createUser.execute(createUser);
  }
}
