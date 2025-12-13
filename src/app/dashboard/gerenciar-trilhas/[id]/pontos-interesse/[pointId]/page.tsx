'use client';

export const runtime = 'edge';

import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import { Button } from '@/components/ui/button';
import { usePhoto } from '@/hooks/use-photo';
import { lexicalJsonToHtml } from '@/lib/lexicalConverter';
import { getImageUrl } from '@/lib/utils';
import { getPoint } from '@/services/points';
import { postAttachments } from '@/services/postAttachments';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { HiMiniTrash } from 'react-icons/hi2';
import { TfiPlus } from 'react-icons/tfi';
import { toast } from 'sonner';

type PageProps = {
  params: Promise<{
    id: string;
    pointId: string;
  }>;
};

interface GalleryPhoto {
  id: string;
  url: string;
}

function PointDetailsPage({ params }: PageProps) {
  const { id: trailId, pointId } = use(params);
  const { handleFileChange, removePhoto, canAddMore, clearPhotos } = usePhoto();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: point,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['point', pointId],
    queryFn: () => getPoint(pointId),
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      return postAttachments({
        file,
        type: 'galery',
        pointOfInterestId: Number(pointId),
      });
    },
    onSuccess: () => {
      toast.success('Foto adicionada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['point', pointId] });
      clearPhotos();
    },
    onError: (error) => {
      toast.error('Erro ao adicionar foto: ' + error);
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await uploadPhotoMutation.mutateAsync(file);
    }
  };

  console.log('point data:', point);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando ponto de interesse...</p>
      </div>
    );
  }

  if (isError || !point) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Erro ao carregar ponto de interesse</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <AppBreadcrumb
        items={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Gerenciar Trilhas', href: '/dashboard/gerenciar-trilhas' },
          {
            label: 'Detalhes da Trilha',
            href: `/dashboard/gerenciar-trilhas/${trailId}`,
          },
          {
            label: 'Pontos de Interesse',
            href: `/dashboard/gerenciar-trilhas/${trailId}/pontos-interesse`,
          },
          { label: point.name },
        ]}
      />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Ponto de Interesse</h1>
        <Button
          onClick={() =>
            router.push(
              `/dashboard/gerenciar-trilhas/${trailId}/pontos-interesse/${pointId}/editar`,
            )
          }
          variant={'primary'}
          className="w-1/5"
          size={'xl'}
        >
          Editar Informações
        </Button>
      </div>

      <div className="flex ">
        <div className="w-30 h-30 relative mr-4 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(point.coverUrl)}
            alt={point.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold justify-center items-center flex">
          {point.name}
        </h1>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Breve sescrição sobre o ponto
        </h2>
        <p className="text-gray-700">{point.shortDescription}</p>
      </div>

      {point.description && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Descrição sobre o ponto
          </h2>
          <div
            className="[&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6"
            dangerouslySetInnerHTML={{
              __html: lexicalJsonToHtml(point.description),
            }}
          />
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Imagens do Ponto</h2>
        <p className="text-md text-primary-dark mb-4">
          Essas imagens irão aparecer quando o usuário for visualizar o ponto de
          interesse
        </p>
        <div className="flex flex-wrap gap-2 w-1/2">
          {point.gallery.map((photo: GalleryPhoto, index: number) => (
            <div
              key={photo.id ?? index}
              className="border border-gray-400 rounded-lg h-37 w-43 relative"
            >
              <Image
                src={getImageUrl(photo.url)}
                alt={`Preview ${index + 1}`}
                className="object-cover rounded-lg h-full w-full"
                width={400}
                height={200}
                quality={95}
              />
              <Button
                className="rounded-full absolute bottom-2 right-2 p-2 h-8 w-8 text-primary-dark bg-white hover:bg-gray-200"
                onClick={() => removePhoto(photo.id)}
              >
                <HiMiniTrash size={20} />
              </Button>
            </div>
          ))}
          {canAddMore && (
            <div
              className={`rounded-lg p-4 cursor-pointer bg-[#E8E8E8] hover:border-gray-600 transition-colors flex items-center justify-center w-43 h-37 ${
                uploadPhotoMutation.isPending
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <label
                htmlFor="file-upload"
                className={`flex flex-col items-center justify-center w-full h-full ${
                  uploadPhotoMutation.isPending
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <span className="text-4xl text-gray-600">
                  {uploadPhotoMutation.isPending ? (
                    <div className="animate-spin">
                      <Loader2> </Loader2>
                    </div>
                  ) : (
                    <TfiPlus />
                  )}
                </span>
                {uploadPhotoMutation.isPending && (
                  <span className="text-xs mt-2">Enviando...</span>
                )}
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                className="hidden"
                onChange={handlePhotoUpload}
                disabled={uploadPhotoMutation.isPending}
              />
            </div>
          )}
        </div>
        Formatos aceitos: PNG, JPG, SVG.
      </div>

      <div className="flex flex-row gap-4">
        <Button
          size="xl"
          className="flex mt-4"
          onClick={() =>
            router.push(
              `/dashboard/gerenciar-trilhas/${trailId}/pontos-interesse`,
            )
          }
        >
          Gerenciar Pontos
        </Button>
        <Button
          size="xl"
          className="flex mt-4"
          onClick={() =>
            router.push(
              `/dashboard/gerenciar-trilhas/${trailId}/pontos-interesse`,
            )
          }
        >
          Novo Ponto
        </Button>
      </div>
    </div>
  );
}

export default PointDetailsPage;
