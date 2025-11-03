import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { GoShield } from 'react-icons/go';
import { MdAccessTimeFilled } from 'react-icons/md';
import { PiMapPinAreaFill } from 'react-icons/pi';
import { RiVipDiamondLine } from 'react-icons/ri';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Trail = {
  imageUrl: string;
  title: string;
  estimatedTime: string;
  distance: string;
  difficulty: string;
  interaction: string;
  information: string;
};

const trailData: Record<string, Trail> = {
  '1': {
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    title: 'Trilha Exemplo 1',
    estimatedTime: '2 horas',
    distance: '5 km',
    difficulty: 'Média',
    interaction: '25',
    information:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  },
};

async function page({ params }: PageProps) {
  const { id } = await params;
  const trail = trailData[id];

  if (!trail) {
    return <div>Trilha não encontrada</div>;
  }

  const { imageUrl, title, estimatedTime, distance, difficulty, information } =
    trail;

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <div className="flex justify-between items-center flex-row">
        <h1 className="text-2xl font-bold text-primary-dark">{title}</h1>
        <Button size="xl" variant="default" className="w-1/5">
          Editar Informações
        </Button>
      </div>

      <div>
        <Image
          src={imageUrl}
          alt={title}
          className="object-cover rounded-lg h-40 w-full"
          width={800}
          height={400}
          quality={95}
        />
        <div className="flex flex-col justify-center mt-4">
          <div className="my-2">
            <p className="flex items-center gap-2">
              <MdAccessTimeFilled color="red" />
              {estimatedTime}
            </p>
            <p className="flex items-center gap-2">
              <PiMapPinAreaFill color="red" />
              {distance}
            </p>
            <p className="flex items-center gap-2">
              <RiVipDiamondLine color="red" />
              {difficulty}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-lg mb-2">Mais Informações</h2>
          <p>{information}</p>
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-lg mb-2">Imagens da Trilha</h2>
          <p className="text-sm text-gray-600 mb-4">
            Essas imagens irão aparecer quando o usuário for visualizar o ponto
            de interesse
          </p>
          <div className="grid grid-cols-3 gap-4 w-1/2">
            <Image
              src={imageUrl}
              alt=""
              className="object-cover rounded-lg h-32 w-full"
              width={400}
              height={200}
              quality={95}
            />
            <Image
              src={imageUrl}
              alt=""
              className="object-cover rounded-lg h-32 w-full"
              width={400}
              height={200}
              quality={95}
            />
            <Image
              src={imageUrl}
              alt=""
              className="object-cover rounded-lg h-32 w-full"
              width={400}
              height={200}
              quality={95}
            />
          </div>
          Formatos aceitos: PNG, JPG, SVG.
        </div>
        <div className="flex flex-col w-40">
          <Button size="lg" variant="default" className="mt-6">
            Sobre a Trilha
          </Button>
          <Button size="lg" variant="default" className="mt-6">
            Pontos de Interesse
          </Button>
        </div>
      </div>
      <div>
        <h2 className="flex flex-row items-center font-bold text-lg mb-2 gap-2">
          <GoShield color="red" /> Dica de Segurança
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
      </div>
    </div>
  );
}

export default page;
