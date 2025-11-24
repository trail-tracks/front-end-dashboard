'use client';

import FormError from '@/components/common/FormError';
import InputCustom from '@/components/common/InputCustom';
import { Button } from '@/components/ui/button';
import { usePhoto } from '@/hooks/use-photo';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { HiUpload } from 'react-icons/hi';
import { HiMiniTrash } from 'react-icons/hi2';
import { use } from 'react';

type CreatePointForm = {
  name: string;
  shortDescription: string;
  description: string;
};

const toolbarActions = ['B', 'I', 'U', '-', 'Lista', 'Citação', 'Link', 'Img'];

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function CreatePointPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { photos, handleFileChange, removePhoto } = usePhoto();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePointForm>({
    defaultValues: {
      name: '',
      shortDescription: '',
      description: '',
    },
  });

  const onSubmit = (data: CreatePointForm) => {
    console.log('Criar ponto de interesse', data, photos);
    router.push(`/dashboard/gerenciar-trilhas/${id}/pontos-de-interesse`);
  };

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark bg-white">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-primary-dark/70">
          Você está em: Home &gt; Gerenciar Trilhas &gt; {id} &gt; Pontos de
          Interesse &gt; Criar Ponto de Interesse
        </p>
        <h1 className="text-2xl font-bold text-primary-dark">
          Criar Ponto de Interesse
        </h1>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-primary-dark">
            Criar Ponto de Interesse
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
              {photos.length === 0 ? (
                <div className="rounded-2xl p-6 cursor-pointer bg-[#E8E8E8] hover:border hover:border-primary-dark transition-colors flex flex-col items-center justify-center h-full">
                  <label
                    htmlFor="file-upload-point"
                    className="cursor-pointer flex flex-col items-center gap-2 w-full h-full text-center"
                  >
                    <span className="text-4xl text-white bg-primary-dark rounded-full p-3">
                      <HiUpload />
                    </span>
                    <span className="text-sm text-primary-dark">
                      Subir imagem
                    </span>
                  </label>
                  <input
                    id="file-upload-point"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="relative rounded-2xl border border-primary-medium/25 h-40 overflow-hidden">
                  <Image
                    src={URL.createObjectURL(photos[0])}
                    alt="Imagem do Ponto"
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full bg-white text-primary-dark hover:bg-gray-100"
                    onClick={() => removePhoto(0)}
                  >
                    <HiMiniTrash />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold">
                Nome do Ponto de Interesse*
              </label>
              <InputCustom
                id="name"
                placeholder="Ex: Mirante dos Ipês"
                {...register('name', { required: 'Campo obrigatório' })}
              />
              {errors.name && <FormError message={errors.name.message} />}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor="shortDescription" className="text-sm font-semibold">
            Breve descrição sobre o ponto
          </label>
          <textarea
            id="shortDescription"
            className="w-full min-h-24 rounded-2xl border border-primary-medium/25 p-3 bg-[#F7F8F2] focus:outline-none focus:ring-2 focus:ring-primary-dark/40"
            placeholder="Adicione um resumo curto sobre o que o visitante encontrará neste ponto."
            {...register('shortDescription', {
              required: 'Campo obrigatório',
              maxLength: {
                value: 240,
                message: 'Máximo de 240 caracteres',
              },
            })}
          />
          {errors.shortDescription && (
            <FormError message={errors.shortDescription.message} />
          )}
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Descrição sobre o ponto
          </label>
          <div className="flex flex-col rounded-2xl border border-primary-medium/25 overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-[#F2F5EA] text-primary-dark/80 text-sm">
              {toolbarActions.map((action) =>
                action === '-' ? (
                  <span key={action} className="h-5 w-px bg-primary-dark/20" />
                ) : (
                  <button
                    key={action}
                    type="button"
                    className="px-2 py-1 rounded-md hover:bg-white/70 transition-colors"
                  >
                    {action}
                  </button>
                ),
              )}
            </div>
            <textarea
              id="description"
              className="w-full min-h-48 p-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary-dark/40"
              placeholder="Detalhe as características do ponto de interesse, narrativa para o visitante, orientações e diferenciais."
              {...register('description', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 20,
                  message: 'Descreva pelo menos 20 caracteres',
                },
              })}
            />
          </div>
          {errors.description && (
            <FormError message={errors.description.message} />
          )}
        </section>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="rounded-2xl bg-primary-dark text-white hover:bg-primary-dark/90 w-full md:w-1/3 lg:w-1/4"
          >
            Criar Ponto de Interesse
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePointPage;

