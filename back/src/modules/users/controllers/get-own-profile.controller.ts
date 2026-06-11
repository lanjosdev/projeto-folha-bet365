import type { Request, Response, NextFunction } from 'express';
import { GetUserService } from '../services/get-user.service.js';
import { HttpHelper } from '../../../utils/http.js';

export class GetOwnProfileController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user!.id;
      
      const getUserService = new GetUserService();
      const user = await getUserService.execute(id);
      
      const response = HttpHelper.ok({ data: user });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
