import type { Request, Response, NextFunction } from 'express';
import { CreateMachineService } from '../services/create-machine.service.js';

export class CreateMachineController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const service = new CreateMachineService();
      const machine = await service.execute(id);
      
      res.status(201).json({
        success: true,
        data: machine,
      });
    } catch (error) {
      next(error);
    }
  }
}
