import { prisma } from '../../lib/prisma.js';

export class MachineRepository {
  async create(id: string) {
    return prisma.machine.create({
      data: { id },
    });
  }

  async findById(id: string) {
    return prisma.machine.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.machine.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
