'use client';
export const runtime = 'edge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GoShield } from 'react-icons/go';
import { MdAccessTimeFilled } from 'react-icons/md';
import { PiMapPinAreaFill } from 'react-icons/pi';
import { RiVipDiamondLine } from 'react-icons/ri';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { IoMdInformationCircle } from 'react-icons/io';
import { TfiPlus } from 'react-icons/tfi';
import { usePhoto } from '@/hooks/use-photo';
import { use } from 'react';
import { HiMiniTrash } from 'react-icons/hi2';

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

function TrailDetails({ params }: PageProps) {
  const { id } = use(params);
  const trail = trailData[id];
  const { photos, handleFileChange, removePhoto, canAddMore } = usePhoto();
  const router = useRouter();

  if (!trail) {
    return <div>Trilha não encontrada</div>;
  }

  const { imageUrl, title, estimatedTime, distance, difficulty, information } =
    trail;

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <div className="flex justify-between items-center flex-row">
        <h1 className="text-2xl font-bold text-primary-dark">{title}</h1>
        <Button size="xl" variant="primary" className="w-1/5 rounded-2xl">
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
          <p className="text-md text-primary-dark mb-4">
            Essas imagens irão aparecer quando o usuário for visualizar o ponto
            de interesse
          </p>
          <div className="grid grid-cols-3 gap-4 w-1/2">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="border border-gray-400 rounded-lg h-32 relative"
              >
                <Image
                  src={URL.createObjectURL(photo)}
                  alt={`Preview ${index + 1}`}
                  className="object-cover rounded-lg h-full w-full"
                  width={400}
                  height={200}
                  quality={95}
                />
                <Button
                  className="rounded-full absolute bottom-2 right-2 p-2 h-8 w-8 text-primary-dark bg-white hover:bg-gray-200"
                  onClick={() => removePhoto(index)}
                >
                  <HiMiniTrash size={20} />
                </Button>
              </div>
            ))}
            {canAddMore && (
              <div
                className=" rounded-lg p-4 cursor-pointer bg-[#E8E8E8]
               hover:border-gray-600 transition-colors flex items-center justify-center h-32"
              >
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                >
                  <span className="text-4xl text-gray-600">
                    <TfiPlus />
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          Formatos aceitos: PNG, JPG, SVG.
        </div>
        <div className="flex flex-col w-50">
          <Button size="lg" className="flex mt-4">
            <IoMdInformationCircle className="m-2" />
            Sobre a Trilha
          </Button>
          <Button
            size="lg"
            variant="primary"
            className="flex mt-4"
            onClick={() =>
              router.push(`/dashboard/gerenciar-trilhas/${id}/pontos-de-interesse`)
            }
          >
            <IoAnalyticsOutline className="m-2" size={20} />
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

export default TrailDetails;
