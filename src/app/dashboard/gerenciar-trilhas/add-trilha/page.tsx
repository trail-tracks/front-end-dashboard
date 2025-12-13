'use client';
import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import FormError from '@/components/common/FormError';
import InputCustom from '@/components/common/InputCustom';
import { Button } from '@/components/ui/button';
import { usePhoto } from '@/hooks/use-photo';
import { CreateTrailDto, createTrailSchema } from '@/schema/createTrail';
import { postAttachments } from '@/services/postAttachments';
import { createTrail } from '@/services/trails';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { HiUpload } from 'react-icons/hi';
import { HiMiniTrash } from 'react-icons/hi2';
import { toast } from 'sonner';

function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { photos, handleFileChange, removePhoto } = usePhoto();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTrailDto>({
    resolver: zodResolver(createTrailSchema),
    defaultValues: {
      name: '',
      description: null,
      shortDescription: '',
      duration: 0,
      distance: 0,
      difficulty: 'facil',
      safetyTips: null,
    },
  });

  const uploadPhotosMutation = useMutation({
    mutationFn: async ({
      trailId,
      photos,
    }: {
      trailId: number;
      photos: File[];
    }) => {
      if (photos.length > 0) {
        await postAttachments({
          file: photos[0],
          type: 'cover',
          trailId,
        });
      }

      if (photos.length > 1) {
        for (let i = 1; i < photos.length; i++) {
          await postAttachments({
            file: photos[i],
            type: 'gallery',
            trailId,
          });
        }
      }
    },
    onError: (error) => {
      toast.error('Erro ao fazer upload das fotos: ' + error);
    },
  });

  const createTrailMutation = useMutation({
    mutationFn: createTrail,
    onSuccess: async (data) => {
      const trailId = data?.trail?.id || data?.id;

      if (!trailId) {
        toast.error('Erro: ID da trilha não foi retornado');
        return;
      }

      if (photos.length > 0) {
        toast.info('Fazendo upload das fotos...');
        try {
          await uploadPhotosMutation.mutateAsync({ trailId, photos });
          toast.success('Trilha criada e fotos enviadas com sucesso!');
        } catch (error) {
          toast.warning('Trilha criada, mas houve erro no upload de fotos');
        }
      } else {
        toast.success('Trilha criada com sucesso!');
      }

      queryClient.invalidateQueries({ queryKey: ['trails'] });
      router.push('/dashboard/gerenciar-trilhas');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Erro ao criar a trilha: ' + error,
      );
    },
  });

  const onSubmit = (data: CreateTrailDto) => {
    createTrailMutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <AppBreadcrumb
        items={[
          { label: 'Home', href: '/dashboard' },
          {
            label: 'Gerenciar Trilhas',
            href: '/dashboard/gerenciar-trilhas',
          },
          { label: 'Criar Trilha' },
        ]}
      />
      <h1 className="text-2xl font-bold text-primary-dark">Criar Trilha</h1>
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
              Nome da Trilha
            </label>
            <InputCustom
              id="name"
              type="text"
              placeholder="Nome da Trilha"
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
            Breve descrição sobre a Trilha
          </label>
          <textarea
            id="shortDescription"
            placeholder="Breve descrição sobre a Trilha"
            className="w-full h-24 p-3 border-2 border-primary-dark rounded-lg resize-none text-left outline-none focus:ring-2 focus:ring-primary-dark/70"
            {...register('shortDescription')}
          />
          {errors.shortDescription && (
            <FormError message={errors.shortDescription?.message} />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2 md:gap-5">
            <div>
              <label htmlFor="duration" className="font-bold text-sm">
                Tempo Estimado (em Min.)
              </label>
              <InputCustom
                id="duration"
                type="number"
                placeholder="Tempo Estimado"
                {...register('duration', { valueAsNumber: true })}
              />
              {errors.duration && (
                <FormError message={errors.duration.message} />
              )}
            </div>
            <div>
              <label htmlFor="distance" className="font-bold text-sm">
                Distância aproximada (em Km)
              </label>
              <InputCustom
                id="distance"
                type="number"
                step="0.1"
                placeholder="Distância Aproximada"
                {...register('distance', { valueAsNumber: true })}
              />
              {errors.distance && (
                <FormError message={errors.distance?.message} />
              )}
            </div>
            <div>
              <label htmlFor="difficulty" className="font-bold text-sm">
                Nível de dificuldade da Trilha
              </label>
              <select
                id="difficulty"
                className="w-full border-2 border-primary-dark rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary-dark/70"
                {...register('difficulty')}
              >
                <option value="facil">Fácil</option>
                <option value="moderado">Moderado</option>
                <option value="dificil">Difícil</option>
                <option value="muito_dificil">Muito Difícil</option>
              </select>
              {errors.difficulty && (
                <FormError message={errors.difficulty?.message} />
              )}
            </div>
          </div>
          <div className="flex flex-col h-full">
            <label htmlFor="safetyTips" className="font-bold text-sm mb-2">
              Dicas de Segurança
            </label>
            <textarea
              id="safetyTips"
              className="w-full h-full border-2 border-primary-dark rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary-dark/70"
              placeholder="Digite as dicas de segurança aqui"
              {...register('safetyTips')}
            />
            {errors.safetyTips && (
              <FormError message={errors.safetyTips?.message} />
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="bg-primary-dark text-white px-4 py-2 rounded-lg lg:w-2/5 mt-4"
          disabled={
            createTrailMutation.isPending || uploadPhotosMutation.isPending
          }
        >
          {createTrailMutation.isPending
            ? 'Criando trilha...'
            : uploadPhotosMutation.isPending
              ? 'Enviando fotos...'
              : 'Cadastrar'}
        </Button>
      </form>
    </div>
  );
}

export default Page;
