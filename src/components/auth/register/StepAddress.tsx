'use client';

import Button from '@/components/common/Button';
import InputCustom from '@/components/common/InputCustom';
import { addressSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormValues = z.infer<typeof addressSchema>;

function StepAddress({ onNext }: { onNext: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    onNext();
  };

  return (
    <form
      className="flex flex-col justify-center text-sm items-center"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-bold text-3xl mb-4">Dados de Localização</h1>
      <div className="flex mb-2 self-start">
        <InputCustom
          {...register('cep')}
          label="CEP"
          name="cep"
          type="text"
          placeholder="00000-000"
          error={errors.cep?.message}
          variant="secondary"
          className="w-1/2"
        />
      </div>

      <InputCustom
        {...register('endereco')}
        label="Endereço"
        name="endereco"
        type="text"
        placeholder="Nucleo Caraguatatuba"
        error={errors.endereco?.message}
        variant="secondary"
      />

      <InputCustom
        {...register('complemento')}
        label="Complemento"
        name="complemento"
        type="text"
        placeholder="Apartamento, bloco..."
        error={errors.complemento?.message}
        variant="secondary"
      />

      <div className="grid grid-cols-5 gap-4 p-0 w-full">
        <div className="col-span-3">
          <InputCustom
            {...register('cidade')}
            label="Cidade"
            name="cidade"
            type="text"
            placeholder="São Paulo"
            error={undefined}
            variant="secondary"
          />
        </div>

        <div className="col-span-1">
          <InputCustom
            {...register('numero')}
            label="N"
            name="numero"
            type="text"
            placeholder="123"
            error={undefined}
            variant="secondary"
          />
        </div>

        <div className="col-span-1">
          <InputCustom
            {...register('estado')}
            label="Estado"
            name="estado"
            type="text"
            placeholder="SP"
            error={undefined}
            variant="secondary"
            className="text-center uppercase"
          />
        </div>
      </div>

      <div className="flex flex-col w-full mt-1 text-red-500 text-xs">
        {errors.cidade && <span>{errors.cidade?.message as string}</span>}
        {errors.numero && <span>{errors.numero?.message as string}</span>}
        {errors.estado && <span>{errors.estado?.message as string}</span>}
      </div>

      <Button
        variant="primary"
        text="Continuar"
        className="py-3 mt-8"
        type="submit"
      />
    </form>
  );
}

export default StepAddress;
