import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';
import { ApplicationError } from '../utils/errors.js';

export function apiTokenMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ApplicationError('Token de autenticação ausente', 401));
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new ApplicationError('Formato de token inválido. Use: Bearer <token>', 401));
  }

  if (token !== env.API_TOKEN) {
    return next(new ApplicationError('Token de autenticação inválido', 401));
  }

  next();
}
