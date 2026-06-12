import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { machineService } from '../services/machineService';
import type { ListMachinesParams } from '../types';

export const MACHINES_QUERY_KEY = ['machines'] as const;

export function useMachines(params?: ListMachinesParams) {
  return useQuery({
    queryKey: [...MACHINES_QUERY_KEY, params],
    queryFn: () => machineService.listMachines(params),
  });
}

export function useArchiveMachine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => machineService.archiveMachine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MACHINES_QUERY_KEY });
    },
  });
}

export function useRestoreMachine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => machineService.restoreMachine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MACHINES_QUERY_KEY });
    },
  });
}

export function useDeleteMachine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => machineService.deleteMachine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MACHINES_QUERY_KEY });
    },
  });
}

export function useUpdateMachineAlias() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => 
      machineService.updateMachineAlias(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MACHINES_QUERY_KEY });
    },
  });
}
