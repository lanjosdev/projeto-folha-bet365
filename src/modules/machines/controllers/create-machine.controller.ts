import type { Request, Response, NextFunction } from 'express';
import { CreateMachineService } from '../services/create-machine.service.js';
import { HttpHelper } from '../../../utils/http.js';

export class CreateMachineController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const service = new CreateMachineService();
      const machine = await service.execute(id);
      
      const response = HttpHelper.created({ data: machine });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
