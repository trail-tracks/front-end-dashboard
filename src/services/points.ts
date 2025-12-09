import { axiosHttp } from "@/services/axios";

type CreatePointParams = {
  name: string;
  description?: string | null;
  shortDescription: string;
  duration: number;
  distance: number;
  difficulty: "facil" | "moderado" | "dificil" | "muito_dificil";
  safetyTips?: string | null;
};

export const createPoint = async ({
  name,
  description,
  shortDescription,
  duration,
  distance,
  difficulty,
  safetyTips,
}: CreatePointParams) => {
  const response = await axiosHttp.post(
    "points",
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

export const getPoint = async () => {
  const response = await axiosHttp.get("/points");
  return response.data.points;
};

export const getPointById = async (id: string) => {
  const response = await axiosHttp.get(`/point/point/${id}`);
  return response.data.point;
};
