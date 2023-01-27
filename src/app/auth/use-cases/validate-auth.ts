import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/app/user/repositories/user-repository';

@Injectable()
export class ValidateAuth {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...userDetails } = user;

      return userDetails;
    }

    return null;
  }
}
