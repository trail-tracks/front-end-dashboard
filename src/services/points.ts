import { axiosHttp } from '@/services/axios';

type CreatePointParams = {
  name: string;
  description?: string | null;
  shortDescription: string;
  trailId: string;
};

type EditPointParams = {
  id: string;
  name?: string;
  description?: string | null;
  shortDescription?: string;
};

export const createPoint = async ({
  name,
  description,
  shortDescription,
  trailId,
}: CreatePointParams) => {
  const response = await axiosHttp.post(
    '/points-of-interest',
    {
      name,
      description,
      shortDescription,
      trailId: Number(trailId),
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getPoint = async (id: string) => {
  const response = await axiosHttp.get(`/points-of-interest/${id}`);
  return response.data.pointOfInterest;
};

export const getTrailPointById = async (id: string) => {
  const response = await axiosHttp.get(`/trails/trail/${id}`);
  return response.data.trail.pointsOfInterest;
};

export const getPointById = async (id: string) => {
  const response = await axiosHttp.get(`/point/point/${id}`);
  return response.data.point;
};

export const editPoint = async ({ id, ...updateData }: EditPointParams) => {
  const response = await axiosHttp.patch(`/points-of-interest/${id}`, {
    id: Number(id),
    ...updateData,
  });

  return response.data;
};

export const deletePoint = async (id: string) => {
  const response = await axiosHttp.delete(`/points-of-interest/${id}`);

  return response.data;
};
