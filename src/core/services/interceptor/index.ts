import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getItem, removeItem } from "../common/storage.services";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // تغییر به NEXT_PUBLIC برای دسترسی به ENV
const instance = axios.create({
  baseURL,
});

interface ApiResponse<T> {
  data: T;
}

const onSuccess = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  return response.data.data; // فرض بر این است که api شما در این فرمت پاسخ می‌دهد
};

const onError = (err: AxiosError) => {
  if (err.response?.status === 401) {
    removeItem("token");
    window.location.pathname = "/Login";
  }

  // if (err?.response.status >= 400 && err.response.status < 500) {
  //   alert("Client Error: " + err.response.status);
  // }

  return Promise.reject(err);
};

instance.interceptors.request.use((opt: AxiosRequestConfig) => {
  const token = getItem("token");

  if (token) {
    opt.headers.Authorization = `Bearer ${token}`;
  }
  return opt;
});

// افزودن interceptor برای پاسخ‌ها
instance.interceptors.response.use(onSuccess, onError);

export default instance;
