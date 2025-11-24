'use client';

import Image from 'next/image';
import { HiMiniTrash } from 'react-icons/hi2';
import { cn } from '@/lib/utils';

type PointCardProps = {
  name: string;
  imageUrl: string;
  onClick: () => void;
  onDelete: () => void;
  className?: string;
};

export function PointCard({
  name,
  imageUrl,
  onClick,
  onDelete,
  className,
}: PointCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-left rounded-3xl border border-primary-medium/25 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-dark/50 transition-shadow hover:shadow-md bg-white',
        className,
      )}
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <button
          type="button"
          className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-primary-dark hover:bg-white shadow-sm"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          aria-label={`Excluir ${name}`}
        >
          <HiMiniTrash size={18} />
        </button>
      </div>
      <div className="bg-primary-dark px-4 py-3">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
    </button>
  );
}


