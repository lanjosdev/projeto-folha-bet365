import { z } from 'zod';
import { loginSchema } from './schemas/loginSchema';

export type LoginRequest = z.infer<typeof loginSchema>;
