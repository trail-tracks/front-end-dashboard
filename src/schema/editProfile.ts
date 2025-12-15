import z from 'zod';

export const editProfileSchema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(50, 'O nome deve ter no máximo 50 caracteres'),
    nameComplement: z
      .string()
      .min(3, 'O complemento deve ter pelo menos 3 caracteres')
      .max(100, 'O complemento deve ter no máximo 100 caracteres')
      .nullable()
      .optional(),
    zipCode: z
      .string()
      .length(8, 'O CEP deve ter exatamente 8 dígitos')
      .regex(/^\d{8}$/, 'CEP deve conter apenas números'),
    address: z
      .string()
      .min(3, 'O endereço deve ter pelo menos 3 caracteres')
      .max(256, 'O endereço deve ter no máximo 256 caracteres'),
    number: z
      .number()
      .int('O número deve ser um inteiro')
      .positive('O número deve ser positivo'),
    city: z
      .string()
      .min(3, 'A cidade deve ter pelo menos 3 caracteres')
      .max(100, 'A cidade deve ter no máximo 100 caracteres'),
    state: z
      .string()
      .toUpperCase()
      .length(2, 'O estado deve ter exatamente 2 letras')
      .regex(
        /^[A-Z]{2}$/,
        'O estado deve estar em formato de sigla (ex: SP, RJ)',
      ),
    addressComplement: z
      .string()
      .max(100, 'O complemento deve ter no máximo 100 caracteres')
      .nullable()
      .optional(),
    ddi: z.string().min(1, 'O DDI nao pode ser vazio'),
    ddd: z.string().length(2, 'O DDD deve ter exatamente 2 caracteres'),
    phoneNumber: z
      .string()
      .length(9, 'O telefone deve ter exatamente 9 caracteres'),
  })
  .transform((data) => ({
    ...data,
    phone: `${data.ddi}${data.ddd}${data.phoneNumber}`,
  }));

export type EditProfileFormInput = z.input<typeof editProfileSchema>;
export type EditProfileFormOutput = z.output<typeof editProfileSchema>;
