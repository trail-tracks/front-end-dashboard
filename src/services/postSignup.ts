import { SignupPayload } from '@/app/entities/signup';
import { axiosHttp } from '@/services/axios';

type FormPayload = Partial<SignupPayload> & {
  ddi?: string;
  ddd?: string;
  telefone?: string;
};

const transformPayload = (payload: FormPayload) => {
  const phone =
    payload.ddi && payload.ddd && payload.telefone
      ? `${payload.ddi}${payload.ddd}${payload.telefone}`
      : payload.phone;

  return {
    name: payload.name,
    nameComplement: payload.nameComplement,
    email: payload.email,
    password: payload.password,
    zipCode: payload.zipCode,
    address: payload.address,
    number: payload.number,
    city: payload.city,
    state: payload.state,
    addressComplement: payload.addressComplement,
    phone: phone,
  };
};

export const postSignup = async (payload: FormPayload) => {
  const transformedPayload = transformPayload(payload);
  const response = await axiosHttp.post('/auth/signup', transformedPayload);
  return response.data;
};
