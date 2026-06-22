import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import type { CreateUserDTO, UpdateUserDTO } from '../types';

export const USERS_QUERY_KEY = ['users'] as const;

export function useUsers() {
  return useQuery({
    queryKey: [...USERS_QUERY_KEY],
    queryFn: () => usersService.getUsers(),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDTO) => usersService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDTO }) => 
      usersService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
}
