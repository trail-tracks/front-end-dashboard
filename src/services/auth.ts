import { axiosHttp } from '@/services/axios';

type ChangeEmailData = {
  currentEmail: string;
  newEmail: string;
  password: string;
};

type ChangePasswordData = {
  password: string;
  newPassword: string;
};

type EditProfileData = {
  name: string;
  nameComplement?: string | null;
  zipCode: string;
  address: string;
  number: number;
  city: string;
  state: string;
  addressComplement?: string | null;
  phone: string;
};

export const authChangeEmail = async (data: ChangeEmailData) => {
  const response = await axiosHttp.patch('/auth/change-email', data);
  return response.data;
};

export const authChangePassword = async (data: ChangePasswordData) => {
  const response = await axiosHttp.patch('/auth/change-password', data);
  return response.data;
};

export const editProfile = async (data: EditProfileData) => {
  const response = await axiosHttp.put('/auth/edit', data);
  return response.data;
};

export const getAuth = async () => {
  const response = await axiosHttp.get('/auth');
  return response.data.entity;
};

export const authLogout = async () => {
  const response = await axiosHttp.post('/auth/logout');
  return response.data;
};
