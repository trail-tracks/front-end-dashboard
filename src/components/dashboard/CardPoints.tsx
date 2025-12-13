import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiMiniTrash } from 'react-icons/hi2';

interface CardPointsProps {
  name: string;
  coverUrl?: string;
  id?: string;
}

function CardPoints({ name, coverUrl, id }: CardPointsProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`pontos-interesse/${id}`);
  };
  return (
    <div className="h-50 w-50 border-2 border-black rounded-lg bg-[#D9D9D9] overflow-hidden">
      <button
        className="flex flex-col justify-center items-center h-full w-full text-primary-dark"
        onClick={handleClick}
      >
        <div className="w-full h-full relative">
          <div
            className="absolute top-2 right-2 p-2 rounded-full bg-white cursor-pointer hover:bg-gray-100 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <HiMiniTrash size={20} className="text-primary-dark" />
          </div>
          <Image
            src={getImageUrl(coverUrl)}
            alt={name}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex w-full h-12 justify-center items-center text-white bg-primary-dark">
          {name}
        </div>
      </button>
    </div>
  );
}

export default CardPoints;
