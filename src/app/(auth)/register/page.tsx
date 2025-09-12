'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/common/Button';
import InputCustom from '@/components/common/InputCustom';
import { useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  complemento: z
    .string()
    .min(2, 'O complemento deve ter pelo menos 2 caracteres'),
  email: z.email('Email inválido'),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(
      /[^a-zA-Z0-9]/,
      'A senha deve conter pelo menos um caractere especial',
    ),
});

type FormValues = z.infer<typeof schema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex bg-[url('/floresta.svg')] bg-cover bg-center justify-center items-center min-h-screen w-full">
      <div className="flex flex-col backdrop-blur-2xl items-center w-lg h-full py-15 px-5 rounded-4xl border-1 border-white/20">
        <div className="w-8/12">
          <h1 className="font-bold text-3xl mb-8">Vamos criar sua Conta!</h1>

          <form
            className="flex flex-col justify-center items-center"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputCustom
              {...register('name')}
              label="Nome da Instituição*"
              name="name"
              type="string"
              placeholder="Parque Estadual"
              error={errors.name?.message}
              variant="secondary"
            />

            <InputCustom
              {...register('complemento')}
              label="Complemento*"
              name="name"
              type="string"
              placeholder="Núcleo Caraguatatuba"
              error={errors.complemento?.message}
              variant="secondary"
            />

            <h1 className="font-bold text-3xl mb-8 mt-8">Seu Acesso</h1>

            <InputCustom
              {...register('email')}
              label="Email Institucional*"
              name="email"
              type="email"
              placeholder="Digite seu email"
              error={errors.email?.message}
              variant="secondary"
            />

            <InputCustom
              {...register('password')}
              label="Senha para acesso*"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              icon={
                showPassword ? (
                  <LuEye size={20} onClick={togglePasswordVisibility} />
                ) : (
                  <LuEyeClosed size={20} onClick={togglePasswordVisibility} />
                )
              }
              error={errors.password?.message}
              variant="secondary"
            />

            <Button
              variant="primary"
              text="Continuar"
              className="py-3 mt-8"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
