import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from '../dtos/update-user-dto';
import { UserRepository } from '../repositories/user-repository';
import { NameIsRequired } from './errors/name-is-required';
import { PasswordIsRequired } from './errors/password-is-required';
import { UserNotFound } from './errors/user-not-found';

@Injectable()
export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, updateUser: UpdateUserDTO): Promise<void> {
    if (updateUser.hasOwnProperty('name') && !updateUser.name)
      throw new NameIsRequired();

    if (updateUser.hasOwnProperty('password') && !updateUser.password)
      throw new PasswordIsRequired();

    const userExists = await this.userRepository.findById(id);

    if (!userExists) throw new UserNotFound();

    await this.userRepository.update(id, updateUser);
  }
}
