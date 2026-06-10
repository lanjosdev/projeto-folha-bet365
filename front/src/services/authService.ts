import { api } from '@/lib/api';
import type { ApiResponse } from '@/types/api';
import type { AuthResponse } from '@/types/auth';
import type { LoginRequest } from '@/features/auth/types';

async function login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
  const response = await api.post<ApiResponse<AuthResponse>>(
    '/auth/login',
    data
  );
  return response.data;
}

export const authService = Object.freeze({ login });

export type AuthService = typeof authService;
