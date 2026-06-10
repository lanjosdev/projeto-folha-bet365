import type { MachineRepository } from '../repositories/machine.repository.js';
import { PrismaMachineRepository } from '../repositories/prisma-machine.repository.js';

export interface ListMachinesRequest {
  page?: number;
  limit?: number;
  status?: string;
}

export class ListMachinesService {
  private repository: MachineRepository;

  constructor() {
    this.repository = new PrismaMachineRepository();
  }

  async execute({ page = 1, limit = 10, status = 'ACTIVE' }: ListMachinesRequest) {
    const skip = (page - 1) * limit;
    
    const [results, total] = await Promise.all([
      this.repository.findAll({ skip, take: limit, status }),
      this.repository.count({ status }),
    ]);

    return {
      results,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
