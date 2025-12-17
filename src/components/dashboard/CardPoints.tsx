import { getImageUrl } from '@/lib/utils';
import { deletePoint } from '@/services/points';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiMiniTrash } from 'react-icons/hi2';
import { toast } from 'sonner';

interface CardPointsProps {
  name: string;
  coverUrl?: string;
  id: string;
  trailId: string;
}

function CardPoints({ name, coverUrl, id, trailId }: CardPointsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deletePointMutation = useMutation({
    mutationFn: deletePoint,
    onSuccess: () => {
      toast.success('Ponto de interesse deletado com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['pointsOfInterest', trailId],
      });
    },
    onError: (error: Error) => {
      toast.error('Erro ao deletar ponto de interesse: ' + error.message);
    },
  });

  const handleClick = () => {
    router.push(`pontos-interesse/${id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;

    if (window.confirm(`Deseja realmente deletar o ponto "${name}"?`)) {
      deletePointMutation.mutate(id);
    }
  };

  return (
    <div className="h-50 w-50 border-2 border-black rounded-lg bg-[#D9D9D9] overflow-hidden">
      <button
        className="flex flex-col justify-center items-center h-full w-full text-primary-dark"
        onClick={handleClick}
      >
        <div className="w-full h-full relative">
          <div
            className="absolute top-2 right-2 p-2 rounded-full bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors z-10"
            onClick={handleDelete}
          >
            <HiMiniTrash
              size={20}
              className={
                deletePointMutation.isPending
                  ? 'text-gray-400'
                  : 'text-primary-dark'
              }
            />
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
