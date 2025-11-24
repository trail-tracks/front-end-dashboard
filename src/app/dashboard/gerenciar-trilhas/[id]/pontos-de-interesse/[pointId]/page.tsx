'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { TfiPlus } from 'react-icons/tfi';

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
      <div className="flex flex-col gap-1">
        <p className="text-sm text-primary-dark/70">
          Você está em: Home &gt; Gerenciar Trilhas &gt; {id} &gt; Pontos de
          interesse &gt; {point.name}
        </p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary-dark">
              Ponto de Interesse
            </h1>
            <p className="text-lg font-semibold text-primary-dark">
              {point.name}
            </p>
          </div>
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

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">Imagens do Ponto</h2>
          <p className="text-sm text-primary-dark/70">
            Essas imagens irão aparecer quando o usuário for visualizar o ponto
            de interesse
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full md:w-2/3">
          {point.gallery.map((imageSrc, index) => (
            <div
              key={imageSrc}
              className="relative rounded-2xl border border-primary-medium/25 h-44 overflow-hidden"
            >
              <Image
                src={imageSrc}
                alt={`${point.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
          <button
            type="button"
            className="rounded-3xl border-2 border-dashed border-primary-medium/40 bg-[#F7F8F2] hover:border-primary-dark hover:text-primary-dark transition-colors flex items-center justify-center h-44"
          >
            <span className="text-5xl text-primary-dark/60">
              <TfiPlus />
            </span>
          </button>
        </div>
        <span className="text-sm text-primary-dark/70">
          Formatos aceitos: PNG, JPG, SVG.
        </span>
      </section>

      <div className="flex flex-wrap gap-4">
        <Button
          size="lg"
          className="rounded-2xl bg-primary-dark text-white hover:bg-primary-dark/90"
          onClick={() =>
            router.push(`/dashboard/gerenciar-trilhas/${id}/pontos-de-interesse`)
          }
        >
          Gerenciar Pontos
        </Button>
      </div>
    </div>
  );
}

export default PointDetailPage;

