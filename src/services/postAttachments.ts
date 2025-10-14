import { axiosHttp } from '@/services/axios';

type PostAttachmentsParams = {
  file: File;
  type: string;
  entityId: number | string;
};

export const postAttachments = async ({
  file,
  type,
  entityId,
}: PostAttachmentsParams) => {
  const formData = new FormData();
  formData.append('attachment', file);

  const response = await axiosHttp.post(
    `/attachments?type=${type}&entityId=${entityId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
