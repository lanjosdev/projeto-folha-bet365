import type { MachineRepository } from '../repositories/machine.repository.js';
import { PrismaMachineRepository } from '../repositories/prisma-machine.repository.js';
import { ApplicationError } from '../../../utils/errors.js';

export class CreateMachineService {
  private repository: MachineRepository;

  constructor() {
    this.repository = new PrismaMachineRepository();
  }

  async execute(id: string) {
    const existingMachine = await this.repository.findById(id);
    
    if (existingMachine) {
      throw new ApplicationError('Máquina já cadastrada', 409);
    }
    
    return this.repository.create(id);
  }
}
