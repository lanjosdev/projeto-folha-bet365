import { hash, compare } from 'bcryptjs';
import type { UserRepository } from '../repositories/user.repository.js';
import { PrismaUserRepository } from '../repositories/prisma-user.repository.js';
import { ApplicationError } from '../../../utils/errors.js';
import type { UpdatePasswordInput } from '../schemas/user.schema.js';

export class UpdateOwnPasswordService {
  private repository: UserRepository;

  constructor() {
    this.repository = new PrismaUserRepository();
  }

  async execute(id: string, data: UpdatePasswordInput) {
    const user = await this.repository.findById(id);
    
    if (!user) {
      throw new ApplicationError('Usuário não encontrado', 404);
    }

    const isPasswordValid = await compare(data.oldPassword, user.password);

    if (!isPasswordValid) {
      throw new ApplicationError('Senha atual incorreta', 401);
    }

    const hashedNewPassword = await hash(data.newPassword, 10);
    
    const updatedUser = await this.repository.update(id, { password: hashedNewPassword });

    const { password: _password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
