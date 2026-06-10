import type { Request, Response, NextFunction } from 'express';
import { DeleteMachineService } from '../services/delete-machine.service.js';
import { HttpHelper } from '../../../utils/http.js';

export class DeleteMachineController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      
      const service = new DeleteMachineService();
      await service.execute(id);
      
      const response = HttpHelper.ok({ message: 'Máquina excluída com sucesso' });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
