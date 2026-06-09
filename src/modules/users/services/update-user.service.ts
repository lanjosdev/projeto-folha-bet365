import { hash } from 'bcryptjs';
import type { UserRepository } from '../repositories/user.repository.js';
import { PrismaUserRepository } from '../repositories/prisma-user.repository.js';
import { ApplicationError } from '../../../utils/errors.js';
import type { UpdateUserInput } from '../schemas/user.schema.js';

export class UpdateUserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new PrismaUserRepository();
  }

  async execute(id: string, data: UpdateUserInput) {
    const existingUser = await this.repository.findById(id);
    
    if (!existingUser) {
      throw new ApplicationError('Usuário não encontrado', 404);
    }

    if (data.email && data.email !== existingUser.email) {
      const userWithEmail = await this.repository.findByEmail(data.email);
      if (userWithEmail) {
        throw new ApplicationError('E-mail já está em uso', 409);
      }
    }
    
    const updateData = { ...data };
    
    if (data.password) {
      updateData.password = await hash(data.password, 10);
    }
    
    const updatedUser = await this.repository.update(id, updateData);

    const { password: _password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
