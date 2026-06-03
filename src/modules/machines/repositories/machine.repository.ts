import type { Machine } from '@prisma/client';

export interface MachineRepository {
  create(id: string): Promise<Machine>;
  findById(id: string): Promise<Machine | null>;
  findAll(): Promise<Machine[]>;
}
