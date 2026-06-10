import type { MachineRepository } from '../repositories/machine.repository.js';
import { PrismaMachineRepository } from '../repositories/prisma-machine.repository.js';

export class ListMachinesService {
  private repository: MachineRepository;

  constructor() {
    this.repository = new PrismaMachineRepository();
  }

  async execute() {
    return this.repository.findAll();
  }
}
