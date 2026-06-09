import type { Request, Response, NextFunction } from 'express';
import { DeleteUserService } from '../services/delete-user.service.js';
import { HttpHelper } from '../../../utils/http.js';

export class DeleteUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const deleteUserService = new DeleteUserService();
      await deleteUserService.execute(id);
      
      const response = HttpHelper.ok({ message: 'Deletado com sucesso' });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
