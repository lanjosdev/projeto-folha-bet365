import type { UserRepository } from '../repositories/user.repository.js';
import { PrismaUserRepository } from '../repositories/prisma-user.repository.js';

export class ListUsersService {
  private repository: UserRepository;

  constructor() {
    this.repository = new PrismaUserRepository();
  }

  async execute() {
    const users = await this.repository.findAll();
    
    return users.map(user => {
      const { password: _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}
