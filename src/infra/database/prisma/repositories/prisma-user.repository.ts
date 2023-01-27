import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateUserDTO } from 'src/app/user/dtos/update-user-dto';
import { UserRepository } from 'src/app/user/repositories/user-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUser: User): Promise<void> {
    await this.prisma.user.create({ data: createUser });
  }

  async update(id: string, updateUser: UpdateUserDTO): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: updateUser });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
