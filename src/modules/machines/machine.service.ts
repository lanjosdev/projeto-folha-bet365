import { MachineRepository } from './machine.repository.js';
import { ApplicationError } from '../../utils/errors.js';

export class MachineService {
  private repository: MachineRepository;

  constructor() {
    this.repository = new MachineRepository();
  }

  async createMachine(id: string) {
    const existingMachine = await this.repository.findById(id);
    
    if (existingMachine) {
      throw new ApplicationError('Máquina já cadastrada', 409);
    }
    
    return this.repository.create(id);
  }

  async listMachines() {
    return this.repository.findAll();
  }
}
