import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApplicationError } from '../utils/errors.js';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApplicationError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub
    };

    return next();
  } catch {
    throw new ApplicationError('Invalid JWT token', 401);
  }
}
