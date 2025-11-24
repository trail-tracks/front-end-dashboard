'use client';

import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import TrailCard from '@/components/dashboard/TrailCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const trails = [
  {
    id: '1',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    title: 'Trilha Exemplo 1',
    estimatedTime: '2 horas',
    distance: '5 km',
    difficulty: 'Média',
    interaction: '25',
  },
  {
    id: '2',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    title: 'Trilha Exemplo 2',
    estimatedTime: '1.5 horas',
    distance: '3 km',
    difficulty: 'Fácil',
    interaction: '25',
  },
  {
    id: '3',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    title: 'Trilha Exemplo 3',
    estimatedTime: '3 horas',
    distance: '8 km',
    difficulty: 'Difícil',
    interaction: '25',
  },
  {
    id: '4',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    title: 'Trilha Exemplo 4',
    estimatedTime: '4 horas',
    distance: '10 km',
    difficulty: 'Difícil',
    interaction: '25',
  },
  {
    id: '5',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    title: 'Trilha Exemplo 5',
    estimatedTime: '2.5 horas',
    distance: '6 km',
    difficulty: 'Média',
    interaction: '25',
  },
  {
    id: '6',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    title: 'Trilha Exemplo 6',
    estimatedTime: '3.5 horas',
    distance: '7 km',
    difficulty: 'Média',
    interaction: '25',
  },
];

function GerenciarTrilhas() {
  //const [trails, setTrails] = useState<Trail[]>([]);
  //useEffect(() => {
  //let isMounted = true;
  //   const fetchTrails = async () => {
  //     try {
  //       const data = await getTrails();
  //       //if (isMounted) setTrails(data);
  //     } catch (error) {
  //       console.error('Erro ao buscar trilhas:', error);
  //     }
  //   };
  //   fetchTrails();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 border rounded-3xl border-primary-medium/25 py-6 w-full min-h-full">
      <div className="px-5 sm:px-20">
        <AppBreadcrumb
          items={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Gerenciar Trilhas' },
          ]}
        />
      </div>

      <div className="flex justify-between items-center flex-row px-5 sm:px-20">
        <h1 className="text-2xl font-bold text-primary-dark">
          Gerenciamento de Trilhas
        </h1>
        <Button
          size="xl"
          variant="default"
          className="w-1/5"
          onClick={() => router.push('/dashboard/gerenciar-trilhas/add-trilha')}
        >
          Criar Trilha
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
        {trails.map((trail, index) => (
          <TrailCard
            key={index}
            id={trail.id}
            imageUrl={trail.imageUrl}
            title={trail.title}
            estimatedTime={trail.estimatedTime}
            distance={trail.distance}
            difficulty={trail.difficulty}
            interaction={trail.interaction}
          />
        ))}
      </div>
    </div>
  );
}

export default GerenciarTrilhas;
