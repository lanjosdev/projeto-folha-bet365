import { hash } from 'bcryptjs';
import type { UserRepository } from '../repositories/user.repository.js';
import { PrismaUserRepository } from '../repositories/prisma-user.repository.js';
import { ApplicationError } from '../../../utils/errors.js';
import type { CreateUserInput } from '../schemas/user.schema.js';

export class CreateUserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new PrismaUserRepository();
  }

  async execute(data: CreateUserInput) {
    const existingUser = await this.repository.findByEmail(data.email);
    
    if (existingUser) {
      throw new ApplicationError('E-mail já está em uso', 409);
    }
    
    const hashedPassword = await hash(data.password, 10);
    
    const user = await this.repository.create({
      ...data,
      password: hashedPassword
    });

    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
