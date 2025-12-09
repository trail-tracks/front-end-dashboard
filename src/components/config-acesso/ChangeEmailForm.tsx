"use client";

import InputCustom from "@/components/common/InputCustom";
import { Button } from "@/components/ui/button";
import { authChangeEmail } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { toast } from "sonner";

interface ChangeEmailFormProps {
  userEmail: string;
}

export function ChangeEmailForm({ userEmail }: ChangeEmailFormProps) {
  const changeEmailMutation = useMutation({
    mutationFn: authChangeEmail,
    onSuccess: () => {
      toast.success("Email alterado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao alterar email. Verifique seus dados."
      );
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const data = {
      currentEmail: (formData.get("currentEmail") as string).toLowerCase(),
      newEmail: (formData.get("newEmail") as string).toLowerCase(),
      password: formData.get("password") as string,
    };

    changeEmailMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 rounded-2xl bg-white px-6 py-6 sm:w-1/2"
    >
      <InputCustom
        label=""
        name="currentEmail"
        placeholder="Email atual"
        type="email"
        autoComplete="email"
        defaultValue={userEmail}
        required
      />
      <InputCustom
        label=""
        name="newEmail"
        placeholder="Novo email"
        type="email"
        autoComplete="email"
        required
      />
      <InputCustom
        label=""
        name="password"
        placeholder="Senha atual"
        type="password"
        autoComplete="current-password"
        required
      />

      <div className="flex justify-start">
        <Button
          type="submit"
          className="w-28 bg-primary-dark text-white hover:bg-secondary-dark"
          disabled={changeEmailMutation.isPending}
        >
          {changeEmailMutation.isPending ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
