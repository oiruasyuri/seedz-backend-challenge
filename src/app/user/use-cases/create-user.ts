import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { UserRepository } from '../repositories/user-repository';
import { EmailInUse } from './errors/email-in-use';
import { EmailIsRequired } from './errors/email-is-required';
import { NameIsRequired } from './errors/name-is-required';
import { PasswordIsRequired } from './errors/password-is-required';

@Injectable()
export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<void> {
    if (!name) throw new NameIsRequired();
    if (!email) throw new EmailIsRequired();
    if (!password) throw new PasswordIsRequired();

    const emailInUse = await this.userRepository.findByEmail(email);

    if (emailInUse) throw new EmailInUse();

    const user = { id: randomUUID(), name, email, password };

    await this.userRepository.create(user);
  }
}
