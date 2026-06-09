import type { UserRepository } from '../repositories/user.repository.js';
import { PrismaUserRepository } from '../repositories/prisma-user.repository.js';
import { ApplicationError } from '../../../utils/errors.js';

export class GetUserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new PrismaUserRepository();
  }

  async execute(id: string) {
    const user = await this.repository.findById(id);
    
    if (!user) {
      throw new ApplicationError('Usuário não encontrado', 404);
    }

    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
