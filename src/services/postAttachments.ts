import { axiosHttp } from '@/services/axios';

type PostAttachmentsParams = {
  file: File;
  type: 'galery' | 'cover';
  trailId?: number;
  entityId?: number;
  pointOfInterestId?: number;
};

export const postAttachments = async ({
  file,
  type,
  trailId,
  entityId,
  pointOfInterestId,
}: PostAttachmentsParams) => {
  const formData = new FormData();
  formData.append('attachment', file);

  const params = new URLSearchParams({ type });
  if (trailId) params.append('trailId', trailId.toString());
  if (entityId) params.append('entityId', entityId.toString());
  if (pointOfInterestId)
    params.append('pointOfInterestId', pointOfInterestId.toString());

  const response = await axiosHttp.post(
    `/attachments?${params.toString()}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    },
  );

  return response.data;
};
