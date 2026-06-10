import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/auth';
import type { LoginRequest } from '../types';

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      login(response.data.token, response.data.user);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard', { replace: true });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Ocorreu um erro ao fazer login.';
      toast.error(message);
    },
  });
}
