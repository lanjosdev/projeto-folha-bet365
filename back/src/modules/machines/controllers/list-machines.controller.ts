import type { Request, Response, NextFunction } from 'express';
import { ListMachinesService } from '../services/list-machines.service.js';
import { HttpHelper } from '../../../utils/http.js';

export class ListMachinesController {
  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const service = new ListMachinesService();
      const machines = await service.execute();
      
      const response = HttpHelper.ok({ data: machines });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
