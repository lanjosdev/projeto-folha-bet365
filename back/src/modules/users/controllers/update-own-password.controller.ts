import type { Request, Response, NextFunction } from 'express';
import { UpdateOwnPasswordService } from '../services/update-own-password.service.js';
import { updatePasswordSchema } from '../schemas/user.schema.js';
import { HttpHelper } from '../../../utils/http.js';

export class UpdateOwnPasswordController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user!.id;
      const data = updatePasswordSchema.parse(req.body);
      const updateOwnPasswordService = new UpdateOwnPasswordService();
      await updateOwnPasswordService.execute(id, data);
      
      const response = HttpHelper.ok({ message: 'Senha atualizada com sucesso' });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
