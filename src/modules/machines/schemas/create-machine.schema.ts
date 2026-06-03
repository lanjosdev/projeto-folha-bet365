import { z } from 'zod';

export const createMachineSchema = z.object({
  body: z.object({
    id: z.string().uuid({ message: 'O formato do ID deve ser um UUID válido' }),
  }),
});
