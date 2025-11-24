'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { TfiPlus } from 'react-icons/tfi';
import { HiMiniTrash } from 'react-icons/hi2';

import { Button } from '@/components/ui/button';

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
      <div className="flex flex-col gap-1">
        <p className="text-sm text-primary-dark/70">
          Você está em: Home &gt; Gerenciar Trilhas &gt; {id} &gt; Pontos de
          Interesse
        </p>
        <h1 className="text-2xl font-bold text-primary-dark">
          Pontos de Interesse da Trilha
        </h1>
        <p className="text-base text-primary-dark/70">
          Gerencie os pontos de parada, mirantes e atrativos disponíveis para os
          visitantes desta trilha.
        </p>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">Pontos cadastrados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point) => (
            <button
              key={point.id}
              type="button"
              onClick={() => handleViewPointDetails(point.id)}
              className="text-left rounded-3xl border border-primary-medium/25 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-dark/50 transition-shadow hover:shadow-md bg-white"
            >
              <div className="relative w-full h-48">
                <Image
                  src={point.imageUrl}
                  alt={point.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <button
                  type="button"
                  className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-primary-dark hover:bg-white"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeletePoint(point.id);
                  }}
                  aria-label={`Excluir ${point.name}`}
                >
                  <HiMiniTrash size={18} />
                </button>
              </div>
              <div className="bg-primary-dark px-4 py-3">
                <h3 className="text-lg font-semibold text-white">
                  {point.name}
                </h3>
              </div>
            </button>
          ))}

          <button
            type="button"
            onClick={handleCreatePoint}
            className="w-full min-h-[240px] rounded-3xl border-2 border-dashed border-primary-medium/40 bg-[#F7F8F2] hover:border-primary-dark hover:text-primary-dark transition-colors flex flex-col items-center justify-center gap-3 justify-self-end"
          >
            <span className="text-5xl text-primary-dark/60">
              <TfiPlus />
            </span>
          </button>
        </div>
      </section>

      <div className="flex justify-start mt-auto">
        <Button
          size="lg"
          className="w-full md:w-1/3 lg:w-1/4 rounded-2xl bg-primary-dark text-white hover:bg-primary-dark/90"
          onClick={() => router.push('/dashboard/gerenciar-trilhas')}
        >
          Concluir
        </Button>
      </div>
    </div>
  );
}

export default PointsOfInterestPage;

