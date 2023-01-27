import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';

@Injectable()
export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) throw new UserNotFound();

    await this.userRepository.delete(id);
  }
}
