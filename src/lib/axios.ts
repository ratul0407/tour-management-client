import config from "@/config";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (error) {
    return error;
  }
);
axiosInstance.interceptors.response.use(
  function onFulFilled(response) {
    return response;
    console.log(response);
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);
