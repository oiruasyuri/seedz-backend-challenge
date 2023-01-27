import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/app/user/dtos/create-user-dto';
import { CreateUser } from 'src/app/user/use-cases/create-user';
import { ReadUser } from 'src/app/user/use-cases/read-user';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly readUser: ReadUser,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUser: CreateUserDTO) {
    await this.createUser.execute(createUser);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async read(@Param('id') id: string) {
    return UserViewModel.toHTTP(await this.readUser.execute(id));
  }
}
