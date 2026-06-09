import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApplicationError } from '../utils/errors.js';
import { HttpHelper } from '../utils/http.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApplicationError) {
    let response;
    switch (err.statusCode) {
      case 400:
        response = HttpHelper.badRequest({ message: err.message });
        break;
      case 404:
        response = HttpHelper.notFound({ message: err.message });
        break;
      case 409:
        response = HttpHelper.conflict({ message: err.message });
        break;
      default:
        response = {
          statusCode: err.statusCode,
          body: { success: false, message: err.message }
        };
    }
    
    res.status(response.statusCode).json(response.body);
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
