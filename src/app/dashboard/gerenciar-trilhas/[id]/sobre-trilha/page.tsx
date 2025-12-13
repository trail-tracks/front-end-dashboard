'use client';
export const runtime = 'edge';
import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import { use as usePromise } from 'react';
function TrailInfo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params);
  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <AppBreadcrumb
        items={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Gerenciar Trilhas', href: '/dashboard/gerenciar-trilhas' },
          {
            label: 'Detalhes da Trilha',
            href: `/dashboard/gerenciar-trilhas/${id}`,
          },
          { label: 'Sobre a Trilha' },
        ]}
      />
    </div>
  );
}

export default TrailInfo;
