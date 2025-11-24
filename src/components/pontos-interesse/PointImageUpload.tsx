'use client';

import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { HiUpload } from 'react-icons/hi';
import { HiMiniTrash } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';

type PointImageUploadProps = {
  imagePreview?: string | null;
  inputId: string;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  helperText?: string;
};

export function PointImageUpload({
  imagePreview,
  inputId,
  onFileChange,
  onRemove,
  helperText = 'Subir imagem',
}: PointImageUploadProps) {
  const hasImage = Boolean(imagePreview);

  if (!hasImage) {
    return (
      <div className="rounded-2xl p-6 cursor-pointer bg-[#E8E8E8] hover:border hover:border-primary-dark transition-colors flex flex-col items-center justify-center h-full">
        <label
          htmlFor={inputId}
          className="cursor-pointer flex flex-col items-center gap-2 w-full h-full text-center"
        >
          <span className="text-4xl text-white bg-primary-dark rounded-full p-3">
            <HiUpload />
          </span>
          <span className="text-sm text-primary-dark">{helperText}</span>
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/svg+xml"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-primary-medium/25 h-40 overflow-hidden">
      {imagePreview && (
        <Image src={imagePreview} alt="Imagem do ponto" fill className="object-cover" />
      )}
      {!!onRemove && (
        <Button
          type="button"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-white text-primary-dark hover:bg-gray-100"
          onClick={onRemove}
        >
          <HiMiniTrash />
        </Button>
      )}
    </div>
  );
}


