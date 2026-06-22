import { api } from '@/lib/api';
import type { ApiResponse } from '@/types/api';
import type { User, CreateUserDTO, UpdateUserDTO } from '../types';

const BASE_PATH = '/users';

async function getUsers(): Promise<ApiResponse<User[]>> {
  const response = await api.get<ApiResponse<User[]>>(BASE_PATH);
  return response.data;
}

async function createUser(data: CreateUserDTO): Promise<ApiResponse<User>> {
  const response = await api.post<ApiResponse<User>>(BASE_PATH, data);
  return response.data;
}

async function updateUser(id: string, data: UpdateUserDTO): Promise<ApiResponse<User>> {
  const response = await api.put<ApiResponse<User>>(`${BASE_PATH}/${id}`, data);
  return response.data;
}

async function deleteUser(id: string): Promise<ApiResponse<void>> {
  const response = await api.delete<ApiResponse<void>>(`${BASE_PATH}/${id}`);
  return response.data;
}

export const usersService = Object.freeze({
  getUsers,
  createUser,
  updateUser,
  deleteUser,
});

export type UsersService = typeof usersService;
