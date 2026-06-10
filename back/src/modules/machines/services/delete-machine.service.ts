import type { MachineRepository } from '../repositories/machine.repository.js';
import { PrismaMachineRepository } from '../repositories/prisma-machine.repository.js';

export class DeleteMachineService {
  private repository: MachineRepository;

  constructor() {
    this.repository = new PrismaMachineRepository();
  }

  async execute(id: string) {
    const machine = await this.repository.findById(id);

    if (!machine) {
      throw new Error('Máquina não encontrada');
    }

    await this.repository.delete(id);
  }
}
