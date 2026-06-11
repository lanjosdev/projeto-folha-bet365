import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'A senha atual é obrigatória'),
  newPassword: z.string().min(6, 'A nova senha deve ter no mínimo 6 caracteres'),
}).refine((data) => data.oldPassword !== data.newPassword, {
  message: 'A nova senha não pode ser igual à senha atual',
  path: ['newPassword'],
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
