import type { Request, Response, NextFunction } from 'express';
import { UpdateUserService } from '../services/update-user.service.js';
import { updateUserSchema } from '../schemas/user.schema.js';
import { HttpHelper } from '../../../utils/http.js';

export class UpdateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const data = updateUserSchema.parse(req.body);
      const updateUserService = new UpdateUserService();
      const user = await updateUserService.execute(id, data);
      
      const response = HttpHelper.ok({ data: user });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
