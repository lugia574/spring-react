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

// 공통 요청 부분
type RequestMethod = "get" | "post" | "put" | "delete";
export const requestHandler = async <R = undefined, T = undefined>(
  method: RequestMethod,
  url: string,
  payload?: T
) => {
  let response;

  switch (method) {
    case "post":
      response = await httpClient.post<R>(url, payload);
      break;
    case "get":
      response = await httpClient.get<R>(url);
      break;
    case "put":
      response = await httpClient.put<R>(url, payload);
      break;
    case "delete":
      response = await httpClient.delete<R>(url);
      break;
  }

  return response.data;
};
