import type { MachineRepository } from '../repositories/machine.repository.js';
import { PrismaMachineRepository } from '../repositories/prisma-machine.repository.js';
import type { Machine } from '@prisma/client';

export class UpdateMachineNameService {
  private machineRepository: MachineRepository;

  constructor() {
    this.machineRepository = new PrismaMachineRepository();
  }

  async execute(id: string, name: string | null): Promise<Machine> {
    const machineExists = await this.machineRepository.findById(id);

    if (!machineExists) {
      throw new Error('Máquina não encontrada.');
    }

    return this.machineRepository.updateName(id, name);
  }
}
