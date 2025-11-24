'use client';

import { useEffect, useMemo, use } from 'react';
import FormError from '@/components/common/FormError';
import InputCustom from '@/components/common/InputCustom';
import { PointImageUpload } from '@/components/pontos-interesse/PointImageUpload';
import { PointsIntro } from '@/components/pontos-interesse/PointsIntro';
import { PointsRichTextToolbar } from '@/components/pontos-interesse/PointsRichTextToolbar';
import { Button } from '@/components/ui/button';
import { usePhoto } from '@/hooks/use-photo';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

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

  const coverPreview = useMemo(() => {
    if (!photos[0]) return null;
    return URL.createObjectURL(photos[0]);
  }, [photos]);

  useEffect(() => {
    return () => {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark bg-white">
      <PointsIntro
        breadcrumb={`Você está em: Home > Gerenciar Trilhas > ${id} > Pontos de Interesse > Criar Ponto de Interesse`}
        title="Criar Ponto de Interesse"
      />

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-primary-dark">
            Criar Ponto de Interesse
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
              <PointImageUpload
                imagePreview={coverPreview}
                inputId="file-upload-point"
                onFileChange={handleFileChange}
                onRemove={photos.length ? () => removePhoto(0) : undefined}
              />
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
            <PointsRichTextToolbar actions={toolbarActions} />
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

