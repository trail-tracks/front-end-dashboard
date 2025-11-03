import TrailCard from '@/components/dashboard/TrailCard';
import { Button } from '@/components/ui/button';

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
  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-6 w-full min-h-full">
      <div className="flex justify-between items-center flex-row">
        <h1 className="text-2xl font-bold text-primary-dark">
          Gerenciamento de Trilhas
        </h1>
        <Button size="xl" variant="default" className="w-1/5">
          Criar Trilha
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3">
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
