import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {}
}
