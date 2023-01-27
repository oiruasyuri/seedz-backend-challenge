import { User } from '@prisma/client';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { UpdateUserDTO } from '../dtos/update-user-dto';

export abstract class UserRepository {
  abstract create(createUser: CreateUserDTO): Promise<void>;
  abstract update(id: string, updateUser: UpdateUserDTO): Promise<void>;
  abstract delete(id: string): Promise<void>;

  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
