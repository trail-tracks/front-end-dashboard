'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

import { AddPointCard } from '@/components/pontos-interesse/AddPointCard';
import { PointCard } from '@/components/pontos-interesse/PointCard';
import { PointsFooter } from '@/components/pontos-interesse/PointsFooter';
import { PointsIntro } from '@/components/pontos-interesse/PointsIntro';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type PointOfInterest = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

const mockedPointsByTrail: Record<string, PointOfInterest[]> = {
  '1': [
    {
      id: 'a',
      name: 'Mirante do Horizonte',
      description:
        'Vista panorâmica da serra com decks elevados para observação e fotos.',
      imageUrl: '/floresta.jpeg',
    },
    {
      id: 'b',
      name: 'Cascata do Sossego',
      description:
        'Pequena queda d’água com área segura para descanso e orientação.',
      imageUrl: '/floresta.jpeg',
    },
  ],
};

function PointsOfInterestPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const points = mockedPointsByTrail[id] ?? [];

  const handleCreatePoint = () => {
    router.push(`/dashboard/gerenciar-trilhas/${id}/pontos-de-interesse/novo`);
  };

  const handleViewPointDetails = (pointId: string) => {
    router.push(
      `/dashboard/gerenciar-trilhas/${id}/pontos-de-interesse/${pointId}`,
    );
  };

const handleDeletePoint = (pointId: string) => {
  console.log('Excluir ponto', pointId);
};

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark bg-white">
      <PointsIntro
        breadcrumb={`Você está em: Home > Gerenciar Trilhas > ${id} > Pontos de Interesse`}
        title="Pontos de Interesse da Trilha"
        description="Gerencie os pontos de parada, mirantes e atrativos disponíveis para os visitantes desta trilha."
      />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">Pontos cadastrados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point) => (
            <PointCard
              key={point.id}
              name={point.name}
              imageUrl={point.imageUrl}
              onClick={() => handleViewPointDetails(point.id)}
              onDelete={() => handleDeletePoint(point.id)}
            />
          ))}

          <AddPointCard onClick={handleCreatePoint} />
        </div>
      </section>

      <PointsFooter onConclude={() => router.push('/dashboard/gerenciar-trilhas')} />
    </div>
  );
}

export default PointsOfInterestPage;

