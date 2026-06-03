import type { Request, Response, NextFunction } from 'express';
import { MachineService } from './machine.service.js';

export class MachineController {
  private service: MachineService;

  constructor() {
    this.service = new MachineService();
    // Bind methods so they can be passed as route handlers directly
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const machine = await this.service.createMachine(id);
      
      res.status(201).json({
        success: true,
        data: machine,
      });
    } catch (error) {
      next(error); // Encaminha para o error-handler
    }
  }

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const machines = await this.service.listMachines();
      
      res.status(200).json({
        success: true,
        data: machines,
      });
    } catch (error) {
      next(error);
    }
  }
}
