import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';

@Injectable()
export class ReadUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFound();

    return user;
  }
}
