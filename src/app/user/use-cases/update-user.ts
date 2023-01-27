import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from '../dtos/update-user-dto';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, updateUser: UpdateUserDTO): Promise<void> {}
}
