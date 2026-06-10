import type { User } from '@prisma/client';
import type { CreateUserInput, UpdateUserInput } from '../schemas/user.schema.js';

export interface UserRepository {
  create(data: CreateUserInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, data: UpdateUserInput): Promise<User>;
  delete(id: string): Promise<void>;
}
