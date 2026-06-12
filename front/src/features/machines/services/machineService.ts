import { api } from '@/lib/api';
import type { ApiResponse, PaginatedResponse } from '@/types/api';
import type { Machine, ListMachinesParams } from '../types';

const BASE_PATH = '/machines';

async function listMachines(params?: ListMachinesParams): Promise<ApiResponse<PaginatedResponse<Machine>>> {
  const response = await api.get<ApiResponse<PaginatedResponse<Machine>>>(BASE_PATH, {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      status: params?.status,
    },
  });
  return response.data;
}

async function archiveMachine(id: string): Promise<ApiResponse<void>> {
  const response = await api.patch<ApiResponse<void>>(`${BASE_PATH}/${id}/archive`);
  return response.data;
}

async function restoreMachine(id: string): Promise<ApiResponse<void>> {
  const response = await api.patch<ApiResponse<void>>(`${BASE_PATH}/${id}/restore`);
  return response.data;
}

async function deleteMachine(id: string): Promise<ApiResponse<void>> {
  const response = await api.delete<ApiResponse<void>>(`${BASE_PATH}/${id}`);
  return response.data;
}

async function updateMachineAlias(id: string, name: string): Promise<ApiResponse<void>> {
  const response = await api.patch<ApiResponse<void>>(`${BASE_PATH}/${id}/name`, { name });
  return response.data;
}

export const machineService = Object.freeze({
  listMachines,
  archiveMachine,
  restoreMachine,
  deleteMachine,
  updateMachineAlias,
});

export type MachineService = typeof machineService;
