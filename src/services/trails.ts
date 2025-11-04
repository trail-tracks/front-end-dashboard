import { axiosHttp } from '@/services/axios';

type CreateTrailParams = {
  name: string;
  description?: string | null;
  shortDescription: string;
  duration: number;
  distance: number;
  difficulty: 'facil' | 'moderado' | 'dificil' | 'muito_dificil';
  safetyTips?: string | null;
};

export const createTrail = async ({
  name,
  description,
  shortDescription,
  duration,
  distance,
  difficulty,
  safetyTips,
}: CreateTrailParams) => {
  const response = await axiosHttp.post(
    '/trails',
    {
      name,
      description,
      shortDescription,
      duration,
      distance,
      difficulty,
      safetyTips,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
};
