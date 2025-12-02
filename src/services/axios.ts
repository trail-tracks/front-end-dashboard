// lib/axios.js
import axios from "axios";

export const axiosHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Optional: Add interceptors (e.g., for auth)
axiosHttp.interceptors.request.use(
  (config) => {
    // For example: attach token from localStorage or cookies
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosHttp.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data, status } = error?.response || {};
    const errorMessage =
      data?.error?.message ||
      data?.message ||
      error?.message ||
      "Erro desconhecido";
    const statusCode = data?.error?.statusCode || status || 500;

    console.error("API Error:", { message: errorMessage, statusCode });

    return Promise.reject({ message: errorMessage, statusCode });
  },
);
