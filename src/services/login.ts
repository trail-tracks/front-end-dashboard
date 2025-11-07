import { axiosHttp } from '@/services/axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export const postLogin = async (payload: LoginPayload) => {
  const response = await axiosHttp.post('/auth/login', payload);
  return response.data;
};
