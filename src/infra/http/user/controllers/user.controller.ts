import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/app/user/dtos/create-user-dto';
import { UpdateUserDTO } from 'src/app/user/dtos/update-user-dto';
import { CreateUser } from 'src/app/user/use-cases/create-user';
import { ReadUser } from 'src/app/user/use-cases/read-user';
import { UpdateUser } from 'src/app/user/use-cases/update-user';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly readUser: ReadUser,
    private readonly updateUser: UpdateUser,
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

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: string, @Body() updateUser: UpdateUserDTO) {
    await this.updateUser.execute(id, updateUser);
  }
}
