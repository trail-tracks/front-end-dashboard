import { axiosHttp } from '@/services/axios';

export interface homePayload {
  success: boolean;
  data?: {
    trailsCount: number;
    poisCount: number;
    lastTrails: {
      id: number;
      name: string;
      distance: string;
      difficulty: string;
      coverUrl: string | null;
    }[];
  };
  error?: {
    message: string;
    statusCode: number;
  };
}

export const getHome = async () => {
  const response = await axiosHttp.get('/entities/home');
  return response.data;
};
