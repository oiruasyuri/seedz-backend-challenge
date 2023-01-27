import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/app/user/dtos/create-user-dto';
import { UpdateUserDTO } from 'src/app/user/dtos/update-user-dto';
import { UserRepository } from 'src/app/user/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(createUser: CreateUserDTO): Promise<void> {
    this.users.push(createUser);
  }

  async update(id: string, updateUser: UpdateUserDTO): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex >= 0) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateUser };
    }
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    }
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
