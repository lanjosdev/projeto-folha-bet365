import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import type { UpdateProfileInput, UpdatePasswordInput } from '../schemas/profileSchema';

export const PROFILE_QUERY_KEY = ['profile'];

export function useGetProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: profileService.getProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => profileService.updateProfile(data),
    onSuccess: (data) => {
      // Atualiza o cache do perfil com os novos dados
      queryClient.setQueryData(PROFILE_QUERY_KEY, data);
      toast.success('Perfil atualizado com sucesso!');
    },
    onError: (error) => {
      let message = 'Ocorreu um erro ao atualizar o perfil.';
      if (isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      toast.error(message);
    },
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (data: UpdatePasswordInput) => profileService.updatePassword(data),
    onSuccess: () => {
      toast.success('Senha atualizada com sucesso!');
    },
    onError: (error) => {
      let message = 'Ocorreu um erro ao atualizar a senha.';
      if (isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      toast.error(message);
    },
  });
}
