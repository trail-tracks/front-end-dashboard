'use client';
import { useRouter } from 'next/navigation';

export default function EditTrail() {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-5'>
      <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-6 w-full min-h-full">
        <div className="flex justify-between items-center flex-row">
          <h1 className="text-2xl font-bold text-primary-dark">
            Informações Gerais
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3">
          <div>Teste</div>
        </div>
      </div>
      <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-6 w-full min-h-full">
        <div className="flex justify-between items-center flex-row">
          <h1 className="text-2xl font-bold text-primary-dark">
            Alterar Logo da Entidade
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3">
          <div>Teste</div>
        </div>
      </div>
    </div>
  );
}
