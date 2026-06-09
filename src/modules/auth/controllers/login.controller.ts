import type { Request, Response, NextFunction } from 'express';
import { LoginService } from '../services/login.service.js';
import { loginSchema } from '../schemas/auth.schema.js';
import { HttpHelper } from '../../../utils/http.js';

export class LoginController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = loginSchema.parse(req.body);
      const loginService = new LoginService();
      const result = await loginService.execute(data);
      
      const response = HttpHelper.ok({ data: result });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
