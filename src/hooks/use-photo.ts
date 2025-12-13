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
    toast.success('Foto removida!');
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
