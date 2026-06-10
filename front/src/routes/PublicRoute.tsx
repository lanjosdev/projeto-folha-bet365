import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  // Se já está logado, não precisa ver a tela de login novamente
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
