'use client';

import { Button } from '@/components/ui/button';

type PointsFooterProps = {
  onConclude: () => void;
  concludeLabel?: string;
};

export function PointsFooter({
  onConclude,
  concludeLabel = 'Concluir',
}: PointsFooterProps) {
  return (
    <div className="flex justify-start mt-auto">
      <Button
        size="lg"
        className="w-full md:w-1/3 lg:w-1/4 rounded-2xl bg-primary-dark text-white hover:bg-primary-dark/90"
        onClick={onConclude}
      >
        {concludeLabel}
      </Button>
    </div>
  );
}


