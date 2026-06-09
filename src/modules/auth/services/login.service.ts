import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { ApplicationError } from '../../../utils/errors.js';
import { env } from '../../../config/env.js';
import type { LoginInput } from '../schemas/auth.schema.js';

const prisma = new PrismaClient();

export class LoginService {
  async execute(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new ApplicationError('E-mail ou senha incorretos', 401);
    }

    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new ApplicationError('E-mail ou senha incorretos', 401);
    }

    const token = jwt.sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: env.JWT_EXPIRES_IN as any
    });

    const { password: _password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }
}
