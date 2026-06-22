import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { MachinesPage } from '@/pages/MachinesPage';
import { UsersPage } from '@/pages/UsersPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ErrorPage } from '@/pages/ErrorPage';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/machines',
            element: <MachinesPage />,
          },
          {
            path: '/users',
            element: <UsersPage />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
          // Aqui podemos adicionar outras rotas privadas no futuro
        ],
      },
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />, // Fallback genérico
      },
    ],
  },
]);
