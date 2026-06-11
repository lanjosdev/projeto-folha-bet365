import { z } from 'zod';

export const updateMachineNameSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'O nome/apelido não pode ser vazio').max(100, 'O nome/apelido deve ter no máximo 100 caracteres').nullable().optional(),
  }),
  params: z.object({
    id: z.string().min(1, 'O ID da máquina não pode estar vazio'),
  }),
});

export type UpdateMachineNameInput = z.infer<typeof updateMachineNameSchema>;
