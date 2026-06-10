export type MachineStatus = 'ACTIVE' | 'ARCHIVED';

export interface Machine {
  id: string;
  status: MachineStatus;
  createdAt: string;
}

export interface ListMachinesParams {
  page?: number;
  limit?: number;
  status?: MachineStatus;
}
