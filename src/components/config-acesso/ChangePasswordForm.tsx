'use client';

import InputCustom from '@/components/common/InputCustom';
import { Button } from '@/components/ui/button';
import { FormEvent } from 'react';

export function ChangePasswordForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 rounded-2xl bg-white px-6 py-6 sm:w-1/2"
    >
      <InputCustom
        label=""
        name="currentPassword"
        placeholder="Senha atual"
        type="password"
        autoComplete="current-password"
        required
      />
      <InputCustom
        label=""
        name="newPassword"
        placeholder="Nova senha"
        type="password"
        autoComplete="new-password"
        required
      />
      <InputCustom
        label=""
        name="confirmPassword"
        placeholder="Confirmar nova senha"
        type="password"
        autoComplete="new-password"
        required
      />

      <div className="flex justify-start">
        <Button
          type="submit"
          className="w-28 bg-primary-dark text-white hover:bg-secondary-dark"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
