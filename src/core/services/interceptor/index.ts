// services/axiosInstance.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { clearStorage, getItem, removeItem } from '../common/storage.services';

const baseURL = process.env.NEXT_PUBLIC_VITE_BASE_URL; 

const instance = axios.create({
  baseURL: baseURL,
});

const clearStorageWithTimeout = () => {
  const twoHoursInSeconds = 2 * 60 * 60; 
  setTimeout(() => {
    clearStorage();
  }, twoHoursInSeconds * 1000); 
};

const onSuccess = (response: AxiosResponse) => {
  return response.data;
};

const onError = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status === 401) {
      clearStorage();
    }

    if (error.response.status >= 404 && error.response.status < 500) {
      alert(`Client Error: ${error.response.status}`);
    }
  }

  return Promise.reject(error);
};


instance.interceptors.response.use(onSuccess, onError);
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
clearStorageWithTimeout();
export default instance;