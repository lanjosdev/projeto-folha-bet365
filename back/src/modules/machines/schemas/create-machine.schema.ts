import { z } from 'zod';

export const createMachineSchema = z.object({
  body: z.object({
    id: z.string().min(1, { message: 'O ID da máquina não pode estar vazio' }),
  }),
});
