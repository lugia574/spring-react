import axios, { AxiosRequestConfig } from "axios";
import {
  getToken,
  removeNickName,
  removeToken,
  setToken,
} from "../stores/authStore";

const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  // 요청 인터셉터
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getToken();
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken.trim()}`;
      } else {
        delete config.headers.authorization;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (res) => {
      const newAccessToken = res.headers.authorization;
      if (newAccessToken) {
        const token = newAccessToken;
        setToken(token);
      }
      return res;
    },
    (err) => {
      if (err.response.status === 401) {
        removeToken();
        removeNickName();
        alert(
          "클라이언트가 인증되지 않았거나, 유효한 인증 정보가 부족하여 요청이 거부되었습니다."
        );
        window.location.href = "/";
        return;
      } else if (err.response.status === 403) {
        alert("이 페이지에 대한 접근 권한이 없습니다.");
        window.location.href = "/";
        return;
      } else if (err.response.status === 400) {
        alert(err.response.data.message);
        console.error(err);
        return;
      } else if (err.response.status >= 500) {
        alert("서버에 문제가 발생했습니다.\n잠시 후에 다시 시도해주세요.");
        console.error(err);
        return;
      }
      return Promise.reject(err);
    }
  );

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
