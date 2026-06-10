import type { Request, Response, NextFunction } from 'express';
import { CreateUserService } from '../services/create-user.service.js';
import { createUserSchema } from '../schemas/user.schema.js';
import { HttpHelper } from '../../../utils/http.js';

export class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createUserSchema.parse(req.body);
      const createUserService = new CreateUserService();
      const user = await createUserService.execute(data);
      
      const response = HttpHelper.created({ data: user });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
