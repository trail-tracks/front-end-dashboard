import { axiosHttp } from "@/services/axios";

type ChangeEmailData = {
  currentEmail: string;
  newEmail: string;
  password: string;
};

export const authChangeEmail = async (data: ChangeEmailData) => {
  const response = await axiosHttp.patch("/auth/change-email", data);
  return response.data;
};
