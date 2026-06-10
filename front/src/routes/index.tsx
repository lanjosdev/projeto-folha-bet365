import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Machines } from '@/pages/Machines';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/machines',
        element: <Machines />,
      },
      // Aqui podemos adicionar outras rotas privadas no futuro
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />, // Fallback genérico
  },
]);
