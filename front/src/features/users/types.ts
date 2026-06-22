export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password?: string; // Opcional ou obrigatório dependendo do contexto. A rota de POST pede password.
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}
