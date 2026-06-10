import { prisma } from '../../../lib/prisma.js';
import type { MachineRepository } from './machine.repository.js';
import type { Machine } from '@prisma/client';

export class PrismaMachineRepository implements MachineRepository {
  async create(id: string): Promise<Machine> {
    return prisma.machine.create({
      data: { id },
    });
  }

  async findById(id: string): Promise<Machine | null> {
    return prisma.machine.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Machine[]> {
    return prisma.machine.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
