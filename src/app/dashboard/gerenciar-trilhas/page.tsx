'use client';

import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import TrailCard from '@/components/dashboard/TrailCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTrails } from '@/services/trails';
import { toast } from 'sonner';

type Trail = {
  imageUrl: string;
  id: string;
  title: string;
  estimatedTime: string;
  distance: string;
  difficulty: string;
  interaction: string;
  information: string;
  duration: string;
  name: string;
};

function GerenciarTrilhas() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const router = useRouter();
  useEffect(() => {
    let isMounted = true;
    const fetchTrails = async () => {
      try {
        const data = await getTrails();
        const trailsArray = Array.isArray(data)
          ? data
          : data.trails || data.data || [];
        if (isMounted) setTrails(trailsArray);
      } catch (error) {
        toast.error('Erro ao buscar trilhas: ' + error);
      }
    };
    fetchTrails();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!trails || trails.length === 0) {
    return <div>Não há trilhas disponíveis.</div>;
  }
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
            imageUrl={
              trail.imageUrl ||
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
            }
            title={trail.name}
            estimatedTime={`${trail.duration} Min`}
            distance={`${trail.distance} Km`}
            difficulty={trail.difficulty.toUpperCase()}
            interaction={trail.interaction}
          />
        ))}
      </div>
    </div>
  );
}

export default GerenciarTrilhas;
