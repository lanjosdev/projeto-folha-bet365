import { useCallback, useEffect, useMemo, useState } from 'react';
import { tokenStorage } from '@/utils/tokenStorage';
import { userStorage } from '@/utils/userStorage';
import { AuthContext, type AuthContextData } from './AuthContext';
import { AUTH_EXPIRED_EVENT } from '@/lib/api';
import type { AuthenticatedUser } from '@/types/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = tokenStorage.get();
    const storedUser = userStorage.get();
    if ((storedToken && !storedUser) || (!storedToken && storedUser)) {
      tokenStorage.clear();
      userStorage.clear();
      return null;
    }
    return storedToken;
  });

  const [user, setUserState] = useState<AuthenticatedUser | null>(() => {
    const storedToken = tokenStorage.get();
    const storedUser = userStorage.get();
    if ((storedToken && !storedUser) || (!storedToken && storedUser)) {
      return null;
    }
    return storedUser;
  });

  const login = useCallback((newToken: string, newUser: AuthenticatedUser) => {
    tokenStorage.set(newToken);
    userStorage.set(newUser);
    setToken(newToken);
    setUserState(newUser);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    userStorage.clear();
    setToken(null);
    setUserState(null);
  }, []);

  const setUser = useCallback((nextUser: AuthenticatedUser) => {
    userStorage.set(nextUser);
    setUserState(nextUser);
  }, []);

  useEffect(() => {
    const handleExpired = () => {
      tokenStorage.clear();
      userStorage.clear();
      setToken(null);
      setUserState(null);
    };

    window.addEventListener(AUTH_EXPIRED_EVENT, handleExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleExpired);
  }, []);

  const value = useMemo<AuthContextData>(
    () => ({
      token,
      user,
      isAuthenticated: token !== null && user !== null,
      login,
      logout,
      setUser,
    }),
    [token, user, login, logout, setUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
