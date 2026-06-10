import type { Machine } from '@prisma/client';

export interface FindAllParams {
  skip?: number;
  take?: number;
  status?: string;
}

export interface MachineRepository {
  create(id: string): Promise<Machine>;
  findById(id: string): Promise<Machine | null>;
  findAll(params?: FindAllParams): Promise<Machine[]>;
  count(params?: { status?: string }): Promise<number>;
  updateStatus(id: string, status: string): Promise<Machine>;
  delete(id: string): Promise<void>;
}
