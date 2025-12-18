import { deleteAttachment } from '@/services/postAttachments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

type UsePhotoOptions = {
  maxPhotos?: number;
  maxSizeInMB?: number;
  acceptedFormats?: string[];
  queryKey?: string[];
};

export function usePhoto(options: UsePhotoOptions = {}) {
  const {
    maxPhotos = 20,
    maxSizeInMB = 5,
    acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'],
    queryKey = [],
  } = options;

  const [photos, setPhotos] = useState<File[]>([]);
  const queryClient = useQueryClient();

  const deletePhotoMutation = useMutation({
    mutationFn: async (attachmentId: string) => {
      return deleteAttachment(attachmentId);
    },
    onSuccess: () => {
      toast.success('Foto removida com sucesso!');
      if (queryKey.length > 0) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
    onError: (error) => {
      toast.error('Erro ao remover foto: ' + error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.size > maxSizeInMB * 1024 * 1024) {
        toast.error(`O arquivo excede o tamanho máximo de ${maxSizeInMB}MB.`);
        return;
      }

      if (!acceptedFormats.includes(file.type)) {
        toast.error('Formato de arquivo não suportado.');
        return;
      }

      if (photos.length >= maxPhotos) {
        toast.error(`Você pode adicionar no máximo ${maxPhotos} fotos.`);
        return;
      }

      setPhotos([...photos, file]);
    }
  };

  const removePhoto = (id: string) => {
    setPhotos(photos.filter((photo) => photo.name !== id));
    deletePhotoMutation.mutate(id);
  };

  const clearPhotos = () => {
    setPhotos([]);
  };

  return {
    photos,
    handleFileChange,
    removePhoto,
    clearPhotos,
    maxPhotos,
    canAddMore: photos.length < maxPhotos,
    isDeleting: deletePhotoMutation.isPending,
  };
}
