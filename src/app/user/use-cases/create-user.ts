import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<void> {}
}
