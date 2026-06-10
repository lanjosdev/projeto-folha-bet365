import type { MachineRepository } from '../repositories/machine.repository.js';
import { PrismaMachineRepository } from '../repositories/prisma-machine.repository.js';

export class ArchiveMachineService {
  private repository: MachineRepository;

  constructor() {
    this.repository = new PrismaMachineRepository();
  }

  async execute(id: string) {
    const machine = await this.repository.findById(id);

    if (!machine) {
      throw new Error('Máquina não encontrada'); // Could use custom AppError if available
    }

    if (machine.status === 'ARCHIVED') {
      throw new Error('Máquina já está arquivada');
    }

    return this.repository.updateStatus(id, 'ARCHIVED');
  }
}
