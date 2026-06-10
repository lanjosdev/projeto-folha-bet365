import type { MachineRepository } from '../repositories/machine.repository.js';
import { PrismaMachineRepository } from '../repositories/prisma-machine.repository.js';

export class RestoreMachineService {
  private repository: MachineRepository;

  constructor() {
    this.repository = new PrismaMachineRepository();
  }

  async execute(id: string) {
    const machine = await this.repository.findById(id);

    if (!machine) {
      throw new Error('Máquina não encontrada');
    }

    if (machine.status === 'ACTIVE') {
      throw new Error('Máquina já está ativa');
    }

    return this.repository.updateStatus(id, 'ACTIVE');
  }
}
