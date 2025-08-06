import config from "@/config";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return error;
  }
);
axiosInstance.interceptors.response.use(
  function onFulFilled(response) {
    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);
