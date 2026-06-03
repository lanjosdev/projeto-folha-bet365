import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApplicationError } from '../utils/errors.js';
import { HttpHelper } from '../utils/http.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    const response = HttpHelper.badRequest({
      message: 'Payload inválido.',
      issues: err.flatten().fieldErrors,
    });
    res.status(response.statusCode).json(response.body);
    return;
  }

  console.error('[unhandled-error]', err);
  const response = HttpHelper.serverError();
  res.status(response.statusCode).json(response.body);
};
