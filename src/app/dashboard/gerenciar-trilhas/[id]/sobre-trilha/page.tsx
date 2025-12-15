'use client';
export const runtime = 'edge';
import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import { use as usePromise } from 'react';
import LexicalEditor from '@/components/common/LexicalEditor';
import FormError from '@/components/common/FormError';
import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getTrailById } from '@/services/trails';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTrail } from '@/services/trails';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

function TrailInfo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params);
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: trail,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ['trail', id],
    queryFn: () => getTrailById(id),
  });

  const {
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<{ description: string }>();

  useEffect(() => {
    if (trail?.description) {
      setDescriptionValue(trail.description);
      reset({ description: trail.description });
    }
  }, [trail, reset]);

  const handleDescriptionChange = useCallback(
    (val: string) => {
      setDescriptionValue(val);
      setValue('description', val, {
        shouldValidate: false,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  const editMutation = useMutation({
    mutationFn: (data: { description: string }) =>
      editTrail({
        id,
        ...data,
      }),
    onSuccess: async () => {
      toast.success('Descrição atualizada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['trail', id] });
      queryClient.invalidateQueries({ queryKey: ['trails'] });
      router.push(`/dashboard/gerenciar-trilhas/${id}`);
    },
    onError: (error) => {
      toast.error('Erro ao adicionar sobre trilha: ' + error);
    },
  });

  const handleSubmit = () => {
    const description = getValues('description');
    editMutation.mutate({ description });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (isError || !trail) {
    return <div>Trilha não encontrada</div>;
  }

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full  text-primary-dark">
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label className="text-lg md:text-2xl font-bold text-primary-dark">
            Sobre a Trilha
          </label>

          <LexicalEditor
            value={descriptionValue}
            onChange={handleDescriptionChange}
          />

          {errors.description && (
            <FormError message={errors.description?.message} />
          )}
        </div>
        <div className="flex mt-4">
          <Button
            type="submit"
            size={'xl'}
            className="px-4 py-2 md:w-1/5 bg-primary-dark text-white rounded-lg hover:bg-primary-medium transition-colors"
            disabled={editMutation.isPending}
          >
            {editMutation.isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TrailInfo;
