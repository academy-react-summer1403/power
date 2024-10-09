import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getItem, removeItem } from "../common/storage.services";
import { useRouter } from 'next/router'; 

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';

const instance = axios.create({
  baseURL,
});

interface ApiResponse<T> {
  data: T;
}

const onSuccess = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  return response.data.data;
};

const onError = (err: AxiosError): Promise<never> => {
  const router = useRouter(); // Get router instance

  if (err.response?.status === 401) {
    removeItem("token");
    router.push("/Login"); // Use Next.js router for navigation
  }

  if (err.response) {
    console.error('Error:', err.response.data);
  } else {
    console.error('Error message:', err.message);
  }

  return Promise.reject(err);
};

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getItem<string>("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(onSuccess, onError);

export default instance;