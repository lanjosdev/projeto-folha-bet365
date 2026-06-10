import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
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
      // Aqui podemos adicionar outras rotas privadas no futuro
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />, // Fallback genérico
  },
]);
