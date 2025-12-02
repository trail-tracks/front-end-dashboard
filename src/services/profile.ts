import { axiosHttp } from "@/services/axios";

export const getProfileData = async () => {
  const response = await axiosHttp.get("/auth");
  return response.data;
};
