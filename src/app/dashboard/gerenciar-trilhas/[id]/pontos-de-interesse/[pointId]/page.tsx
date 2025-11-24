'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';

import { PointsFooter } from '@/components/pontos-interesse/PointsFooter';
import { PointsGallery } from '@/components/pontos-interesse/PointsGallery';
import { PointsIntro } from '@/components/pontos-interesse/PointsIntro';
import { Button } from '@/components/ui/button';

type PageProps = {
  params: Promise<{
    id: string;
    pointId: string;
  }>;
};

type PointDetails = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  headerImage: string;
  gallery: string[];
};

const mockedPointDetails: Record<
  string,
  Record<string, PointDetails>
> = {
  '1': {
    a: {
      id: 'a',
      name: 'Lagoa Escondida',
      shortDescription:
        'Área de preservação com lago cristalino e decks para contemplação segura.',
      description:
        'Localizada em meio a uma paisagem deslumbrante, a Lagoa Escondida é um dos pontos turísticos mais encantadores da região. Com suas rochas imponentes e vista panorâmica de 360º, o local é ideal para quem busca contato com a natureza, sensação de contemplação e momentos de paz. O acesso por meio da trilha oferece diferentes níveis de dificuldade, o que torna a experiência ainda mais imersiva ao longo do percurso. Seus visitantes contam com o apoio de totens informativos e placas em toda a área para orientação sobre a fauna e flora local. Seja para admirar o pôr do sol, praticar fotografia ou simplesmente relaxar, a Lagoa Escondida é o destino perfeito para quem deseja se conectar com o ambiente natural.',
      headerImage: '/floresta.jpeg',
      gallery: ['/floresta.jpeg'],
    },
  },
};

function PointDetailPage({ params }: PageProps) {
  const { id, pointId } = use(params);
  const router = useRouter();

  const point = mockedPointDetails[id]?.[pointId];

  if (!point) {
    return (
      <div className="border rounded-3xl border-primary-medium/25 p-8 text-primary-dark">
        Ponto de interesse não encontrado.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark bg-white">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <PointsIntro
          breadcrumb={`Você está em: Home > Gerenciar Trilhas > ${id} > Pontos de interesse > ${point.name}`}
          title="Ponto de Interesse"
        >
          <p className="text-lg font-semibold text-primary-dark">{point.name}</p>
        </PointsIntro>
        <Button
          size="xl"
          variant="primary"
          className="rounded-2xl"
          onClick={() =>
            router.push(
              `/dashboard/gerenciar-trilhas/${id}/pontos-de-interesse/${pointId}/editar`,
            )
          }
        >
          Editar Informações
        </Button>
      </div>

      <section className="flex gap-6 flex-col md:flex-row">
        <div className="relative w-48 h-36 rounded-2xl overflow-hidden bg-[#F7F8F2]">
          <Image
            src={point.headerImage}
            alt={point.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">
            Breve descrição sobre o ponto
          </h2>
          <p className="text-primary-dark/80">{point.shortDescription}</p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Descrição sobre o ponto</h2>
        <p className="text-primary-dark/80 leading-relaxed">
          {point.description}
        </p>
      </section>

      <PointsGallery
        images={point.gallery}
        onAddImage={() => console.log('Adicionar imagem do ponto')}
      />

      <PointsFooter
        onConclude={() =>
          router.push(`/dashboard/gerenciar-trilhas/${id}/pontos-de-interesse`)
        }
        concludeLabel="Gerenciar Pontos"
      />
    </div>
  );
}

export default PointDetailPage;

