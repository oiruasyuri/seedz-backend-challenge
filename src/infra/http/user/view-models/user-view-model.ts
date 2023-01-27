import { User } from '@prisma/client';

export class UserViewModel {
  static toHTTP({ password, ...user }: User) {
    return user;
  }
}
