import type { Request, Response, NextFunction } from 'express';
import { ListMachinesService } from '../services/list-machines.service.js';
import { HttpHelper } from '../../../utils/http.js';

export class ListMachinesController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const service = new ListMachinesService();
      const result = await service.execute({ page, limit });
      
      const response = HttpHelper.ok({ data: result });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
