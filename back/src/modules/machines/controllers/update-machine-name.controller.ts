import type { Request, Response } from 'express';
import { UpdateMachineNameService } from '../services/update-machine-name.service.js';

export class UpdateMachineNameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name } = req.body;

    const updateMachineNameService = new UpdateMachineNameService();

    await updateMachineNameService.execute(id as string, name || null);

    return res.status(200).json({
      success: true,
      message: 'Nome da máquina atualizado com sucesso',
    });
  }
}
