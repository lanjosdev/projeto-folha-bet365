import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { AppLayout } from '@/components/layout/AppLayout';

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
