import { z } from 'zod';

export const createPointSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome da trilha deve ter pelo menos 3 caracteres')
    .max(100, 'Nome da trilha muito longo'),

  shortDescription: z
    .string()
    .min(10, 'Breve descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Breve descrição muito longa'),

  description: z
    .string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(10000, 'Descrição muito longa')
    .nullable()
    .optional(),
});

export type CreatePointDto = z.infer<typeof createPointSchema>;
