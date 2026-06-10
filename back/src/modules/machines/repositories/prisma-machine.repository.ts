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

  async findAll(params?: { skip?: number; take?: number; status?: string }): Promise<Machine[]> {
    return prisma.machine.findMany({
      where: params?.status ? { status: params.status } : undefined,
      skip: params?.skip,
      take: params?.take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async count(params?: { status?: string }): Promise<number> {
    return prisma.machine.count({
      where: params?.status ? { status: params.status } : undefined,
    });
  }

  async updateStatus(id: string, status: string): Promise<Machine> {
    return prisma.machine.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.machine.delete({
      where: { id },
    });
  }
}
