'use client';
import { Input } from '@/components/ui/input';
import { usePhoto } from '@/hooks/use-photo';
import { HiUpload } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { HiMiniTrash } from 'react-icons/hi2';
import Image from 'next/image';
import { createTrailSchema, CreateTrailDto } from '@/schema/createTrail';
import { createTrail } from '@/services/trails';

function Page() {
  const { photos, handleFileChange, removePhoto } = usePhoto();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTrailDto>({
    resolver: zodResolver(createTrailSchema),
    defaultValues: {
      name: '',
      description: null,
      shortDescription: '',
      duration: 0,
      distance: 0,
      difficulty: 'facil',
      safetyTips: null,
    },
  });

  const onSubmit = async (data: CreateTrailDto) => {
    try {
      console.log('Form Data:', data);
      console.log('Uploaded Photos:', photos);

      const response = await createTrail(data);
      console.log('Trilha criada com sucesso:', response);
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <h1 className="text-2xl font-bold text-primary-dark">Criar Trilha</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-5 h-40">
          {photos.length === 0 ? (
            <div className="rounded-lg p-4 cursor-pointer bg-[#E8E8E8] hover:border-gray-600 transition-colors flex items-center justify-center h-full col-span-1">
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
              >
                <span className="text-4xl text-white bg-primary-dark rounded-full p-2">
                  <HiUpload />
                </span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <>
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="border border-gray-400 rounded-lg h-40 relative"
                >
                  <Image
                    src={URL.createObjectURL(photo)}
                    alt={`Preview ${index + 1}`}
                    className="object-cover rounded-lg h-full w-full"
                    width={400}
                    height={200}
                    quality={95}
                  />
                  <Button
                    type="button"
                    className="rounded-full absolute bottom-2 right-2 p-2 h-8 w-8 text-primary-dark bg-white hover:bg-gray-200"
                    onClick={() => removePhoto(index)}
                  >
                    <HiMiniTrash size={20} />
                  </Button>
                </div>
              ))}
            </>
          )}
          <div className="flex flex-col col-span-2 gap-2">
            <label htmlFor="name" className="font-bold text-sm">
              Nome da Trilha
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Nome da Trilha"
              className="w-full"
              {...register('name')}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="shortDescription"
            className="text-2xl font-bold text-primary-dark"
          >
            Breve descrição sobre a Trilha
          </label>
          <Input
            id="shortDescription"
            type="text"
            placeholder="Breve descrição sobre a Trilha"
            className="flex w-full h-24 justify-self-start"
            {...register('shortDescription')}
          />
          {errors.shortDescription && (
            <span className="text-red-500 text-xs">
              {errors.shortDescription.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="duration" className="font-bold text-sm">
                Tempo Estimado (em Min.)
              </label>
              <Input
                id="duration"
                type="number"
                placeholder="Tempo Estimado"
                {...register('duration', { valueAsNumber: true })}
              />
              {errors.duration && (
                <span className="text-red-500 text-xs">
                  {errors.duration.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="distance" className="font-bold text-sm">
                Distância aproximada (em Km)
              </label>
              <Input
                id="distance"
                type="number"
                step="0.1"
                placeholder="Distância Aproximada"
                {...register('distance', { valueAsNumber: true })}
              />
              {errors.distance && (
                <span className="text-red-500 text-xs">
                  {errors.distance.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="difficulty" className="font-bold text-sm">
                Nível de dificuldade da Trilha
              </label>
              <select
                id="difficulty"
                className="w-full border border-gray-300 rounded-lg p-2"
                {...register('difficulty')}
              >
                <option value="facil">Fácil</option>
                <option value="moderado">Moderado</option>
                <option value="dificil">Difícil</option>
                <option value="muito_dificil">Muito Difícil</option>
              </select>
              {errors.difficulty && (
                <span className="text-red-500 text-xs">
                  {errors.difficulty.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col h-full">
            <label htmlFor="safetyTips" className="font-bold text-sm mb-2">
              Dicas de Segurança
            </label>
            <textarea
              id="safetyTips"
              className="w-full h-full border border-gray-300 rounded-lg p-2"
              placeholder="Digite as dicas de segurança aqui"
              {...register('safetyTips')}
            />
            {errors.safetyTips && (
              <span className="text-red-500 text-xs">
                {errors.safetyTips.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary-dark text-white px-4 py-2 rounded-lg w-1/5 mt-4"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Page;
