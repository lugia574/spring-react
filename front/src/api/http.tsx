import axios, { AxiosRequestConfig } from "axios";

const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  // axiosInstance.interceptors.request.use((err) => {
  //   console.log("api  요청 오류", err);
  //   return Promise.reject(err);
  // });

  // axiosInstance.interceptors.response.use((err) => {
  //   console.log("api 응답 오류", err);
  //   return Promise.reject(err);
  // });

  return axiosInstance;
};

export const httpClient = createClient();
