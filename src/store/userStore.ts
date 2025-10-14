import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserData = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export type UserStore = {
  userData: Partial<UserData>;
  setUserData: (payload: Partial<UserData>) => void;
  setUserField: <K extends keyof UserData>(key: K, value: UserData[K]) => void;
  resetUser: () => void;
  getToken: () => string | null;
  setToken: (token: string) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userData: {},

      setUserData: (payload) =>
        set((state) => ({
          userData: {
            ...state.userData,
            ...payload,
          },
        })),

      setUserField: (key, value) =>
        set((state) => ({
          userData: {
            ...state.userData,
            [key]: value,
          },
        })),

      resetUser: () => set({ userData: {} }),

      getToken: () => get().userData.token ?? null,

      setToken: (token: string) =>
        set((state) => ({
          userData: {
            ...state.userData,
            token,
          },
        })),
    }),
    {
      name: 'user-data',
    },
  ),
);
