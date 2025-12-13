'use client';

import Button from '@/components/common/Button';
import Card from '@/components/dashboard/Card';
import TrailCard from '@/components/dashboard/TrailCard';
import { getImageUrl } from '@/lib/utils';
import { getHome } from '@/services/home';
import { Trail } from '@/types/trail';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function DashboardPage() {
  const router = useRouter();

  const { data: homeData } = useQuery({
    queryKey: ['home'],
    queryFn: getHome,
  });

  return (
    <div className="w-full min-h-full flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center">
        <div className="flex flex-col sm:flex-row gap-5 gap-h-full w-full h-auto sm:h-1/3 mb-6">
          <Card
            value={homeData?.trailsCount || 0}
            label="Trilhas cadastradas"
            className="h-auto"
          />
          <Card
            value={homeData?.poisCount || 0}
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
      <div className="flex flex-col w-full lg:w-1/2 h-min-full border border-primary-medium/25 rounded-3xl p-6">
        <Button
          text="Trilhas Recentes"
          className="font-bold w-full h-11 text-2xl px-6 pointer-events-none"
          variant={'icon'}
        />
        <div className="flex flex-col w-full items-center justify-center">
          {!homeData?.lastTrails || homeData.lastTrails.length === 0 ? (
            <p className="text-primary-dark my-10 font-bold text-2xl">
              Nenhuma trilha recente
            </p>
          ) : (
            <>
              {homeData.lastTrails.map((trail: Trail, index: number) => (
                <TrailCard
                  key={index}
                  id={trail.id}
                  imageUrl={getImageUrl(trail.coverUrl ?? undefined)}
                  name={trail.name}
                  duration={`${trail.duration} Min`}
                  distance={`${trail.distance} Km`}
                  difficulty={trail.difficulty.toUpperCase()}
                />
              ))}

              <div className="w-full flex justify-center">
                <Button
                  text={'VER TODOS'}
                  className="flex w-1/6 mt-2 justify-center bg-white border border-yellow-400 text-yellow-400"
                  onClick={() => router.push('dashboard/gerenciar-trilhas')}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
