'use client';

import FormError from '@/components/common/FormError';
import InputCustom from '@/components/common/InputCustom';
import { Button } from '@/components/ui/button';
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from '@/schema/changePassword';
import { authChangePassword } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { toast } from 'sonner';

export function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((show) => !show);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((show) => !show);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: { password: string; newPassword: string }) =>
      authChangePassword(data),
    onSuccess: () => {
      toast.success('Senha alterada com sucesso!');
      reset();
    },
    onError: (error: Error) => {
      toast.error('Erro ao alterar senha: ' + error.message);
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePasswordMutation.mutate({
      password: data.password,
      newPassword: data.newPassword,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 rounded-2xl bg-white px-6 py-6 sm:w-1/2"
    >
      <div>
        <InputCustom
          label=""
          placeholder="Senha atual"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          {...register('password')}
          icon={
            showPassword ? (
              <LuEye size={20} onClick={togglePasswordVisibility} />
            ) : (
              <LuEyeClosed size={20} onClick={togglePasswordVisibility} />
            )
          }
          error={errors.password?.message}
          maxLength={20}
        />
        {errors.password && <FormError message={errors.password.message} />}
      </div>

      <div>
        <InputCustom
          label=""
          placeholder="Nova senha"
          type={showNewPassword ? 'text' : 'password'}
          autoComplete="new-password"
          {...register('newPassword')}
          icon={
            showNewPassword ? (
              <LuEye size={20} onClick={toggleNewPasswordVisibility} />
            ) : (
              <LuEyeClosed size={20} onClick={toggleNewPasswordVisibility} />
            )
          }
          error={errors.newPassword?.message}
          maxLength={20}
        />
        {errors.newPassword && (
          <FormError message={errors.newPassword.message} />
        )}
      </div>

      <div>
        <InputCustom
          label=""
          placeholder="Confirmar nova senha"
          type={showConfirmPassword ? 'text' : 'password'}
          autoComplete="new-password"
          {...register('confirmPassword')}
          icon={
            showConfirmPassword ? (
              <LuEye size={20} onClick={toggleConfirmPasswordVisibility} />
            ) : (
              <LuEyeClosed
                size={20}
                onClick={toggleConfirmPasswordVisibility}
              />
            )
          }
          error={errors.confirmPassword?.message}
          maxLength={20}
        />
        {errors.confirmPassword && (
          <FormError message={errors.confirmPassword.message} />
        )}
      </div>

      <div className="flex justify-start">
        <Button
          type="submit"
          className="w-28 bg-primary-dark text-white hover:bg-secondary-dark"
          disabled={changePasswordMutation.isPending}
        >
          {changePasswordMutation.isPending ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}
