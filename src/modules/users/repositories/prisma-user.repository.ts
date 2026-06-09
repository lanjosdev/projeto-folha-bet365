import { PrismaClient, User } from '@prisma/client';
import type { UserRepository } from './user.repository.js';
import type { CreateUserInput, UpdateUserInput } from '../schemas/user.schema.js';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
