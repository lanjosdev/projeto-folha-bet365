export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  // Adicione outras propriedades de role se necessário
}

export interface AuthResponse {
  user: AuthenticatedUser;
  token: string;
}
