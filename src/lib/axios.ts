import Axios, { type InternalAxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import { useNotificationStore } from "@/stores/notifications";
import { getToken } from "@/utils/storage";

function authRequestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  const token = getToken();
  if (token) {
    config.headers.authorization = `bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    useNotificationStore().add({
      type: "error",
      title: "Error",
      message,
    });

    return Promise.reject(error);
  }
);
