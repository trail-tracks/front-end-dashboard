'use client';
export const runtime = 'edge';
import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import { Button } from '@/components/ui/button';
import { usePhoto } from '@/hooks/use-photo';
import { getImageUrl } from '@/lib/utils';
import { postAttachments } from '@/services/postAttachments';
import { getQRCode } from '@/services/qrcode';
import { getTrailById } from '@/services/trails';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { GoShield } from 'react-icons/go';
import { HiQrcode } from 'react-icons/hi';
import { HiMiniTrash } from 'react-icons/hi2';
import { IoMdInformationCircle } from 'react-icons/io';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { MdAccessTimeFilled } from 'react-icons/md';
import { PiMapPinAreaFill } from 'react-icons/pi';
import { RiVipDiamondLine } from 'react-icons/ri';
import { TfiPlus } from 'react-icons/tfi';
import { toast } from 'sonner';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

interface GalleryPhoto {
  id: string;
  url: string;
}

function TrailDetails({ params }: PageProps) {
  const { id } = use(params);
  const { handleFileChange, removePhoto, clearPhotos } = usePhoto({
    maxPhotos: 20,
    queryKey: ['trail', id],
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: trail,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ['trail', id],
    queryFn: () => getTrailById(id),
  });

  const { data: pdfBlob, isLoading: isLoadingQR } = useQuery({
    queryKey: ['qrcode', id],
    queryFn: () => getQRCode(id),
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      return postAttachments({
        file,
        type: 'gallery',
        trailId: Number(id),
      });
    },
    onSuccess: () => {
      toast.success('Foto adicionada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['trail', id] });
      clearPhotos();
    },
    onError: (error) => {
      toast.error('Erro ao adicionar foto: ' + error);
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPhotoCount = trail?.gallery?.length || 0;
    if (currentPhotoCount >= 20) {
      toast.error('Você já atingiu o limite máximo de 20 fotos.');
      return;
    }

    handleFileChange(e);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await uploadPhotoMutation.mutateAsync(file);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (isError || !trail) {
    return <div>Trilha não encontrada</div>;
  }

  const currentPhotoCount = trail.gallery?.length || 0;
  const canAddMore = currentPhotoCount < 20;

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <AppBreadcrumb
        items={[
          { label: 'Home', href: '/dashboard' },
          {
            label: 'Gerenciar Trilhas',
            href: '/dashboard/gerenciar-trilhas',
          },
          { label: trail.name },
        ]}
      />
      <div className="flex justify-between items-center flex-row">
        <h1 className="text-2xl font-bold text-primary-dark">{trail.name}</h1>
        <div className="flex w-1/2 justify-end items-center gap-4">
          <Button
            size="xl"
            className="w-1/2 lg:w-1/3 rounded-2xl"
            asChild
            disabled={isLoadingQR || !pdfBlob}
          >
            <a
              href={pdfBlob ? URL.createObjectURL(pdfBlob) : '#'}
              download={`qrcode-${trail.name}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isLoadingQR ? 'Carregando...' : 'Gerar QR Code'}
              <HiQrcode className="mr-2" />
            </a>
          </Button>
          <Button
            size="xl"
            variant="primary"
            className="w-1/2 lg:w-1/3 rounded-2xl"
            onClick={() =>
              router.push(`/dashboard/gerenciar-trilhas/${id}/editar-trilha`)
            }
          >
            Editar Informações
          </Button>
        </div>
      </div>

      <div>
        <Image
          src={getImageUrl(trail.coverUrl)}
          alt={trail.name}
          className="object-fill rounded-lg h-85 w-full"
          width={1280}
          height={720}
          quality={95}
        />
        <div className="flex flex-col justify-center mt-4">
          <div className="my-2">
            <p className="flex items-center gap-2">
              <MdAccessTimeFilled color="red" />
              {trail.duration} Min
            </p>
            <p className="flex items-center gap-2">
              <PiMapPinAreaFill color="red" />
              {trail.distance} Km
            </p>
            <p className="flex items-center gap-2">
              <RiVipDiamondLine color="red" />
              {trail.difficulty.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-lg mb-2">Mais Informações</h2>
          <p>{trail.shortDescription}</p>
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-lg mb-2">Imagens da Trilha</h2>
          <p className="text-md text-primary-dark mb-4">
            Essas imagens irão aparecer quando o usuário for visualizar o ponto
            de interesse
          </p>
          <div className="flex flex-wrap gap-4 w-full">
            {trail.gallery.map((photo: GalleryPhoto, index: number) => (
              <div
                key={index}
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
                  disabled={uploadPhotoMutation.isPending}
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
        <div className="flex flex-col w-50">
          <Button
            size="lg"
            className="flex mt-4"
            onClick={() =>
              router.push(`/dashboard/gerenciar-trilhas/${id}/sobre-trilha`)
            }
          >
            <IoMdInformationCircle className="m-2" />
            Sobre a Trilha
          </Button>
          <Button
            size="lg"
            variant="primary"
            className="flex mt-4"
            onClick={() =>
              router.push(`/dashboard/gerenciar-trilhas/${id}/pontos-interesse`)
            }
          >
            <IoAnalyticsOutline className="m-2" size={20} />
            Pontos de Interesse
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="flex flex-row items-center justify-center font-bold text-lg mb-2 gap-2">
          <GoShield color="red" /> Dica de Segurança
        </h2>
        <p>{trail.safetyTips || 'Nenhuma dica de segurança disponível.'}</p>
      </div>
    </div>
  );
}

export default TrailDetails;
