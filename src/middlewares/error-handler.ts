import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApplicationError } from '../utils/errors.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Payload inválido.',
      issues: err.flatten().fieldErrors,
    });
    return;
  }

  console.error('[unhandled-error]', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor.',
  });
};
