import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';
import type { Profile } from '../types';
import type { UpdateProfileInput, UpdatePasswordInput } from '../schemas/profileSchema';

export const profileService = {
  async getProfile(): Promise<Profile> {
    const response = await api.get<ApiResponse<Profile>>('/users/me');
    return response.data.data;
  },

  async updateProfile(data: UpdateProfileInput): Promise<Profile> {
    const response = await api.put<ApiResponse<Profile>>('/users/me', data);
    return response.data.data;
  },

  async updatePassword(data: UpdatePasswordInput): Promise<void> {
    await api.patch('/users/me/password', data);
  },
};
