import { createContext, useContext } from 'react';
import type { AuthenticatedUser } from '@/types/auth';

export interface AuthContextData {
  token: string | null;
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthenticatedUser) => void;
  logout: () => void;
  setUser: (user: AuthenticatedUser) => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
