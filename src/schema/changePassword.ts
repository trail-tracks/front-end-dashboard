import z from 'zod';

const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'A senha atual deve ter no mínimo 6 caracteres'),
    newPassword: z
      .string()
      .min(6, 'A nova senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme a nova senha'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export { changePasswordSchema, type ChangePasswordFormData };
