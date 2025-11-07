import { postAttachments } from '@/services/postAttachments';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

type UsePhotoOptions = {
  maxPhotos?: number;
  maxSizeInMB?: number;
  acceptedFormats?: string[];
};

export function usePhoto(options: UsePhotoOptions = {}) {
  const {
    maxPhotos = 3,
    maxSizeInMB = 5,
    acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'],
  } = options;

  const [photos, setPhotos] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert(`O arquivo excede o tamanho máximo de ${maxSizeInMB}MB.`);
        return;
      }

      if (!acceptedFormats.includes(file.type)) {
        alert('Formato de arquivo não suportado.');
        return;
      }

      if (photos.length < maxPhotos) {
        setPhotos([...photos, file]);
      } else {
        alert(`Você pode adicionar no máximo ${maxPhotos} fotos.`);
      }

      uploadPhoto(file);
    }
  };

  const uploadPhoto = async (file: File) => {
    mutate({
      file,
      type: 'galery',
    });
  };

  const { mutate } = useMutation({
    mutationFn: postAttachments,
    onError: (error) => {
      toast.error(error.message || 'Erro ao fazer upload da foto');
    },
    onSuccess: () => {
      toast.success('Foto enviada com sucesso!');
    },
  });

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
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
  };
}
