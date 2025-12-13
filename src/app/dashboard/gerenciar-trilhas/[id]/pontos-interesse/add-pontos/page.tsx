'use client';
export const runtime = 'edge';
import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import FormError from '@/components/common/FormError';
import InputCustom from '@/components/common/InputCustom';
import { Button } from '@/components/ui/button';
import { usePhoto } from '@/hooks/use-photo';
import { CreatePointDto, createPointSchema } from '@/schema/createPoint';
import { createPoint } from '@/services/points';
import { postAttachments } from '@/services/postAttachments';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { HiUpload } from 'react-icons/hi';
import { HiMiniTrash } from 'react-icons/hi2';
import { toast } from 'sonner';

import LexicalEditor from '@/components/common/LexicalEditor';

function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = use(params);
  const { photos, handleFileChange, removePhoto } = usePhoto();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePointDto>({
    resolver: zodResolver(createPointSchema),
    defaultValues: {
      name: '',
      description: null,
      shortDescription: '',
    },
  });

  const uploadPhotosMutation = useMutation({
    mutationFn: async ({
      pointOfInterestId,
      photos,
    }: {
      pointOfInterestId: number;
      photos: File[];
    }) => {
      if (photos.length > 0) {
        await postAttachments({
          file: photos[0],
          type: 'cover',
          pointOfInterestId,
        });
      }

      if (photos.length > 1) {
        for (let i = 1; i < photos.length; i++) {
          await postAttachments({
            file: photos[i],
            type: 'gallery',
            pointOfInterestId,
          });
        }
      }
    },
    onError: (error) => {
      toast.error('Erro ao fazer upload das fotos: ' + error);
    },
  });

  const createPointMutation = useMutation({
    mutationFn: (data: CreatePointDto & { trailId: string }) =>
      createPoint(data),
    onSuccess: async (data) => {
      const pointId = data?.pointOfInterest?.id || data?.id;

      if (!pointId) {
        toast.error('Erro: ID do ponto de interesse não foi retornado');
        return;
      }

      if (photos.length > 0) {
        toast.info('Fazendo upload das fotos...');
        try {
          await uploadPhotosMutation.mutateAsync({
            pointOfInterestId: pointId,
            photos,
          });
          toast.success('Ponto criado e fotos enviadas com sucesso!');
        } catch (error) {
          toast.warning('Ponto criado, mas houve erro no upload de fotos');
        }
      } else {
        toast.success('Ponto de Interesse criado com sucesso!');
      }

      queryClient.invalidateQueries({ queryKey: ['points'] });
      queryClient.invalidateQueries({ queryKey: ['trail', id] });
      router.push(`/dashboard/gerenciar-trilhas/${id}/pontos-interesse`);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          'Erro ao criar o ponto de interesse: ' + error,
      );
    },
  });

  const onSubmit = (data: CreatePointDto) => {
    console.log('Form Data:', data);
    console.log('Uploaded Photos:', photos);
    createPointMutation.mutate({ ...data, trailId: id });
  };

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <AppBreadcrumb
        items={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Gerenciar Trilhas', href: '/dashboard/gerenciar-trilhas' },
          {
            label: 'Detalhes da Trilha',
            href: `/dashboard/gerenciar-trilhas/${id}`,
          },
          {
            label: 'Trilha Pontos de Interesse a Trilha',
            href: `/dashboard/gerenciar-trilhas/${id}/pontos-interesse`,
          },
          { label: 'Criar Ponto de Interesse' },
        ]}
      />

      <h1 className="text-2xl font-bold text-primary-dark">
        Criar Ponto de Interesse
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 lg:gap-6 md:h-40">
          {photos.length === 0 ? (
            <div className="rounded-lg p-4 cursor-pointer bg-[#E8E8E8] hover:border-gray-600 transition-colors flex items-center justify-center h-full col-span-1">
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
              >
                <span className="text-4xl text-white bg-primary-dark rounded-full p-2">
                  <HiUpload />
                </span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <>
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="border border-gray-400 rounded-lg h-40 relative"
                >
                  <Image
                    src={URL.createObjectURL(photo)}
                    alt={`Preview ${index + 1}`}
                    className="object-cover rounded-lg h-full w-full"
                    width={400}
                    height={200}
                    quality={95}
                  />
                  <Button
                    type="button"
                    className="rounded-full absolute bottom-2 right-2 p-2 h-8 w-8 text-primary-dark bg-white hover:bg-gray-200"
                    onClick={() => removePhoto(photo.name)}
                  >
                    <HiMiniTrash size={20} />
                  </Button>
                </div>
              ))}
            </>
          )}

          <div className="flex flex-col col-span-2 gap-2 mt-2 justify-center">
            <label htmlFor="name" className="font-bold text-sm">
              Nome do Ponto de Interesse
            </label>
            <InputCustom
              id="name"
              type="text"
              placeholder="Nome do Ponto de Interesse"
              className="w-full"
              {...register('name')}
            />
            {errors.name && <FormError message={errors.name?.message} />}
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="shortDescription"
            className="text-lg md:text-2xl font-bold text-primary-dark"
          >
            Breve descrição sobre o Ponto de Interesse
          </label>
          <textarea
            id="shortDescription"
            placeholder="Breve descrição sobre o Ponto de Interesse"
            className="w-full h-24 p-3 border-2 border-primary-dark rounded-lg resize-none text-left outline-none focus:ring-2 focus:ring-primary-dark/70"
            {...register('shortDescription')}
          />
          {errors.shortDescription && (
            <FormError message={errors.shortDescription?.message} />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg md:text-2xl font-bold text-primary-dark">
            Informações adicionais do Ponto de Interesse
          </label>

          <LexicalEditor
            value={watch('description') ?? ''}
            onChange={(val) => setValue('description', val)}
          />

          {errors.description && (
            <FormError message={errors.description?.message} />
          )}
        </div>

        <Button
          type="submit"
          className="bg-primary-dark text-white px-4 py-2 rounded-lg lg:w-2/5 mt-4"
          disabled={
            createPointMutation.isPending || uploadPhotosMutation.isPending
          }
        >
          {createPointMutation.isPending
            ? 'Criando ponto...'
            : uploadPhotosMutation.isPending
              ? 'Enviando fotos...'
              : 'Criar Ponto de Interesse'}
        </Button>
      </form>
    </div>
  );
}

export default Page;
