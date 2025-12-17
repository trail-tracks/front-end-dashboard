'use client';
export const runtime = 'edge';
import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import CardPoints from '@/components/dashboard/CardPoints';
import { Button } from '@/components/ui/button';
import { getTrailPointById } from '@/services/points';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { use as usePromise } from 'react';
import { TfiPlus } from 'react-icons/tfi';

interface Point {
  id: string;
  name: string;
  coverUrl: string;
}

function PointsOfInterest({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params);
  const router = useRouter();

  const { data: points } = useQuery({
    queryKey: ['pointsOfInterest', id],
    queryFn: () => getTrailPointById(id),
  });

  const onClick = () => {
    router.push(`/dashboard/gerenciar-trilhas/${id}`);
  };

  const addPointOfInterest = () => {
    router.push(
      `/dashboard/gerenciar-trilhas/${id}/pontos-interesse/add-pontos`,
    );
  };

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <AppBreadcrumb
        items={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Gerenciar Trilhas', href: '/dashboard/gerenciar-trilhas' },
          {
            label: 'Detalhes da Trilha',
            href: `/dashboard/gerenciar-trilhas/${id}`,
          },
          { label: 'Trilha Pontos de Interesse a Trilha' },
        ]}
      />
      <h1 className="text-2xl font-bold text-primary-dark">
        Pontos de Interesse a Trilha
      </h1>

      <div className="flex flex-wrap gap-4">
        {points &&
          points.map((point: Point) => (
            <CardPoints
              key={point.id}
              id={point.id}
              name={point.name}
              coverUrl={point.coverUrl}
              trailId={id}
            />
          ))}

        <button
          type="button"
          onClick={addPointOfInterest}
          className="
            h-50 w-50
            border-2 border-dashed border-black
            rounded-lg bg-[#D9D9D9]
            flex items-center justify-center
            text-primary-dark
            hover:bg-gray-300 transition
          "
        >
          <TfiPlus className="text-4xl" />
        </button>
      </div>

      <div className="flex w-full mt-auto">
        <Button className="w-60 h-12" onClick={onClick}>
          Concluir
        </Button>
      </div>
    </div>
  );
}

export default PointsOfInterest;
