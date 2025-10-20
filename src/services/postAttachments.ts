import { axiosHttp } from '@/services/axios';

type PostAttachmentsParams = {
  file: File;
  type: string;
};

export const postAttachments = async ({
  file,
  type,
}: PostAttachmentsParams) => {
  const formData = new FormData();
  formData.append('attachment', file);

  const response = await axiosHttp.post(`/attachments?type=${type}`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
