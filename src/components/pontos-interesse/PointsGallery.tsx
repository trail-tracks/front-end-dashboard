'use client';

import Image from 'next/image';
import { TfiPlus } from 'react-icons/tfi';

type PointsGalleryProps = {
  images: string[];
  onAddImage?: () => void;
  acceptedFormatsLabel?: string;
};

export function PointsGallery({
  images,
  onAddImage,
  acceptedFormatsLabel = 'Formatos aceitos: PNG, JPG, SVG.',
}: PointsGalleryProps) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">Imagens do Ponto</h2>
        <p className="text-sm text-primary-dark/70">
          Essas imagens irão aparecer quando o usuário for visualizar o ponto de interesse
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full md:w-2/3">
        {images.map((imageSrc, index) => (
          <div
            key={imageSrc}
            className="relative rounded-2xl border border-primary-medium/25 h-44 overflow-hidden"
          >
            <Image
              src={imageSrc}
              alt={`Imagem do ponto ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
        {onAddImage && (
          <button
            type="button"
            className="rounded-3xl border-2 border-dashed border-primary-medium/40 bg-[#F7F8F2] hover:border-primary-dark hover:text-primary-dark transition-colors flex items-center justify-center h-44"
            onClick={onAddImage}
          >
            <span className="text-5xl text-primary-dark/60">
              <TfiPlus />
            </span>
          </button>
        )}
      </div>
      <span className="text-sm text-primary-dark/70">{acceptedFormatsLabel}</span>
    </section>
  );
}


