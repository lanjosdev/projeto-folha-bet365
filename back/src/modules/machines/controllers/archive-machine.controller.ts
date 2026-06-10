import type { Request, Response, NextFunction } from 'express';
import { ArchiveMachineService } from '../services/archive-machine.service.js';
import { HttpHelper } from '../../../utils/http.js';

export class ArchiveMachineController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      
      const service = new ArchiveMachineService();
      await service.execute(id);
      
      const response = HttpHelper.ok({ message: 'Máquina arquivada com sucesso' });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
