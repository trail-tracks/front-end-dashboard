'use client';

import Button from '@/components/common/Button';
import Card from '@/components/dashboard/Card';
import TrailCard from '@/components/dashboard/TrailCard';
import { useRouter } from 'next/navigation';
import { FaAngleLeft } from 'react-icons/fa6';

function DashboardPage() {
  const router = useRouter();
  const trails = [
    {
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      title: 'Trilha Exemplo 1',
      estimatedTime: '2 horas',
      distance: '5 km',
      difficulty: 'Média',
      interaction: '25',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      title: 'Trilha Exemplo 2',
      estimatedTime: '1.5 horas',
      distance: '3 km',
      difficulty: 'Fácil',
      interaction: '25',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      title: 'Trilha Exemplo 3',
      estimatedTime: '3 horas',
      distance: '8 km',
      difficulty: 'Difícil',
      interaction: '25',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      title: 'Trilha Exemplo 4',
      estimatedTime: '4 horas',
      distance: '10 km',
      difficulty: 'Difícil',
      interaction: '25',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      title: 'Trilha Exemplo 5',
      estimatedTime: '2.5 horas',
      distance: '6 km',
      difficulty: 'Média',
      interaction: '25',
    },
  ];

  return (
    <div className="w-full min-h-full flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center">
        <div className="flex flex-col sm:flex-row gap-5 gap-h-full w-full h-auto sm:h-1/3 mb-6">
          <Card value="5" label="Trilhas cadastradas" className="h-auto" />
          <Card
            value="16"
            label="Pontos de interesse cadastrados"
            className="h-auto"
          />
        </div>
        <div className="flex flex-col w-full h-auto sm:h-2/3 items-center justify-center border border-primary-medium/25 rounded-3xl gap-5 sm:gap-10">
          <Card
            value="120"
            label="Usuários cadastrados"
            className="border-none"
          />
          <Card value="45" label="Usuários ativos" className="border-none" />
        </div>
      </div>
      <div className="flex flex-wrap w-full lg:w-1/2 h-min-full items-center justify-center border border-primary-medium/25 rounded-3xl px-6">
        <Button
          text="Trilhas Populares"
          className="font-bold w-full"
          icon={<FaAngleLeft className="rotate-270 justify-end text-red-500" />}
          variant={'icon'}
        />
        <div className="flex w-full flex-wrap items-center justify-center">
          {trails.slice(0, 2).map((trail, index) => (
            <TrailCard
              key={index}
              imageUrl={trail.imageUrl}
              title={trail.title}
              estimatedTime={trail.estimatedTime}
              distance={trail.distance}
              difficulty={trail.difficulty}
              interaction={trail.interaction}
            />
          ))}
          <div className="w-full flex justify-center">
            <Button
              text={'VER TODOS'}
              className="flex w-1/6 mt-2 justify-center bg-white border border-yellow-400 text-yellow-400"
              onClick={() => router.push('/gerenciar-trilhas')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
