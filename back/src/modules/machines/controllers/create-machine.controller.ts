import type { Request, Response, NextFunction } from 'express';
import { CreateMachineService } from '../services/create-machine.service.js';
import { HttpHelper } from '../../../utils/http.js';

export class CreateMachineController {
  async handle(req: Request, res: Response, next: NextFunction) {
    console.log(
      '[CreateMachineController] Requisição recebida em POST /machines',
    );
    console.log('[CreateMachineController] Headers:', req.headers);
    console.log('[CreateMachineController] Body:', req.body);
    try {
      const { id } = req.body;
      const service = new CreateMachineService();
      const machine = await service.execute(id);

      console.log(
        '[CreateMachineController] Máquina criada com sucesso:',
        machine,
      );
      const response = HttpHelper.created({ data: machine });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.error('[CreateMachineController] Erro ao criar máquina:', error);
      next(error);
    }
  }
}
