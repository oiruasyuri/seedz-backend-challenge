import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class ReadUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {}
}
