'use client';

import { TfiPlus } from 'react-icons/tfi';
import { cn } from '@/lib/utils';

type AddPointCardProps = {
  onClick: () => void;
  className?: string;
};

export function AddPointCard({ onClick, className }: AddPointCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full min-h-[240px] rounded-3xl border-2 border-dashed border-primary-medium/40 bg-[#F7F8F2] hover:border-primary-dark hover:text-primary-dark transition-colors flex flex-col items-center justify-center gap-3 justify-self-end',
        className,
      )}
    >
      <span className="text-5xl text-primary-dark/60">
        <TfiPlus />
      </span>
    </button>
  );
}


