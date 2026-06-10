import type { Request, Response, NextFunction } from 'express';
import { RestoreMachineService } from '../services/restore-machine.service.js';
import { HttpHelper } from '../../../utils/http.js';

export class RestoreMachineController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      
      const service = new RestoreMachineService();
      await service.execute(id);
      
      const response = HttpHelper.ok({ message: 'Máquina ativada com sucesso' });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
