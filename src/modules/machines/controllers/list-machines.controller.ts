import type { Request, Response, NextFunction } from 'express';
import { ListMachinesService } from '../services/list-machines.service.js';

export class ListMachinesController {
  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const service = new ListMachinesService();
      const machines = await service.execute();
      
      res.status(200).json({
        success: true,
        data: machines,
      });
    } catch (error) {
      next(error);
    }
  }
}
