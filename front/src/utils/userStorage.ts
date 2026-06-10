import type { AuthenticatedUser } from '@/types/auth';

const USER_KEY = '@app:user';

export const userStorage = {
  get(): AuthenticatedUser | null {
    const data = localStorage.getItem(USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as AuthenticatedUser;
    } catch {
      return null;
    }
  },

  set(user: AuthenticatedUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clear(): void {
    localStorage.removeItem(USER_KEY);
  },
};
