'use client';
export const runtime = 'edge';
import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import FormError from '@/components/common/FormError';
import InputCustom from '@/components/common/InputCustom';
import LexicalEditor from '@/components/common/LexicalEditor';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/utils';
import { CreatePointDto, createPointSchema } from '@/schema/createPoint';
import { editPoint, getPoint } from '@/services/points';
import { postAttachments } from '@/services/postAttachments';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiUpload } from 'react-icons/hi';
import { HiMiniTrash } from 'react-icons/hi2';
import { toast } from 'sonner';

function EditPoint({ params }: { params: Promise<{ pointId: string }> }) {
  const { pointId } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [newCoverPhoto, setNewCoverPhoto] = useState<File | null>(null);
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const hasLoadedDataRef = useRef(false);

  const {
    data: point,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ['point', pointId],
    queryFn: () => getPoint(pointId),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreatePointDto>({
    resolver: zodResolver(createPointSchema),
  });

  useEffect(() => {
    if (point && !hasLoadedDataRef.current) {
      reset({
        name: point.name,
        description: point.description,
        shortDescription: point.shortDescription,
      });
      setDescriptionValue(point.description || '');
      hasLoadedDataRef.current = true;
    }
  }, [point, reset]);

  const handleDescriptionChange = useCallback(
    (val: string) => {
      setValue('description', val, {
        shouldValidate: false,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      return postAttachments({
        file,
        type: 'cover',
        pointOfInterestId: Number(pointId),
      });
    },
    onSuccess: () => {
      toast.success('Foto atualizada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['point', pointId] });
      queryClient.invalidateQueries({ queryKey: ['points'] });
    },
    onError: (error: Error) => {
      toast.error('Erro ao atualizar foto: ' + error.message);
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: CreatePointDto) =>
      editPoint({
        id: pointId,
        ...data,
      }),
    onSuccess: async () => {
      if (newCoverPhoto) {
        await uploadPhotoMutation.mutateAsync(newCoverPhoto);
      }
      toast.success('Ponto editado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['point', pointId] });
      queryClient.invalidateQueries({ queryKey: ['points'] });
      router.push(`/dashboard/gerenciar-trilhas/2/pontos-interesse/${pointId}`);
    },
    onError: (error) => {
      toast.error('Erro ao editar o ponto: ' + error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast.error('A imagem deve ter no máximo 5MB.');
        return;
      }

      const validTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/svg+xml',
      ];
      if (!validTypes.includes(file.type)) {
        toast.error('Formato inválido. Use PNG, JPG ou SVG.');
        return;
      }

      setNewCoverPhoto(file);
      toast.success('Foto selecionada!');
    }
  };

  const removeCoverPhoto = () => {
    setNewCoverPhoto(null);
    toast.success('Foto removida!');
  };

  const onSubmit = (data: CreatePointDto) => {
    editMutation.mutate(data);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (isError || !point) {
    return <div>Ponto de Interesse não encontrado</div>;
  }

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <AppBreadcrumb
        items={[
          { label: 'Home', href: '/dashboard' },
          {
            label: 'Gerenciar Trilhas',
            href: '/dashboard/gerenciar-trilhas',
          },
          {
            label: 'Detalhes da Trilha',
            href: `/dashboard/gerenciar-trilhas/${point.trailId}`,
          },
          {
            label: 'Pontos de Interesse',
            href: `/dashboard/gerenciar-trilhas/${point.trailId}/pontos-interesse`,
          },
          {
            label: `${point.name}`,
            href: `/dashboard/gerenciar-trilhas/${point.trailId}/pontos-interesse/${point.id}`,
          },
          { label: 'Editar Ponto de Interesse' },
        ]}
      />
      <h1 className="text-2xl font-bold text-primary-dark">
        Editar Ponto de Interesse
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 lg:gap-6 md:h-40">
          <div className="border border-gray-400 rounded-lg h-40 relative">
            <Image
              src={
                newCoverPhoto
                  ? URL.createObjectURL(newCoverPhoto)
                  : getImageUrl(point.coverUrl) ||
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop'
              }
              alt={`Foto de capa - ${point.name}`}
              className="object-cover rounded-lg h-full w-full"
              width={400}
              height={200}
              quality={95}
            />
            <div className="absolute bottom-2 right-2 flex gap-2">
              {newCoverPhoto && (
                <Button
                  type="button"
                  className="rounded-full p-2 h-8 w-8 text-primary-dark bg-white hover:bg-gray-200"
                  onClick={removeCoverPhoto}
                >
                  <HiMiniTrash size={20} />
                </Button>
              )}
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-full p-2 h-8 w-8 text-white bg-primary-dark hover:bg-primary-dark/80 flex items-center justify-center"
              >
                <HiUpload size={20} />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
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
            Breve descrição sobre o ponto
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

        <div className="flex flex-col gap-2">
          <label className="text-lg md:text-2xl font-bold text-primary-dark">
            Descricao sobre o ponto
          </label>

          <LexicalEditor
            value={descriptionValue}
            onChange={handleDescriptionChange}
          />

          {errors.description && (
            <FormError message={errors.description?.message} />
          )}
        </div>

        <Button
          type="submit"
          className="bg-primary-dark text-white px-4 py-2 rounded-lg lg:w-2/5 mt-4"
          disabled={editMutation.isPending}
        >
          {editMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </div>
  );
}

export default EditPoint;
