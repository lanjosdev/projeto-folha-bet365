import type { Request, Response, NextFunction } from 'express';
import { ListUsersService } from '../services/list-users.service.js';
import { HttpHelper } from '../../../utils/http.js';

export class ListUsersController {
  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const listUsersService = new ListUsersService();
      const users = await listUsersService.execute();
      
      const response = HttpHelper.ok({ data: users });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
