import { axiosHttp } from '@/services/axios';

export const getQRCode = async (id: string) => {
  const response = await axiosHttp.get(`/qrcode/${id}`, {
    responseType: 'blob',
  });
  return response.data;
};
