import { User } from "../model/User.model";
import { httpClient } from "./http";
import { isEmailProps, LoginProps } from "../pages/LoginPage";
import { ErrorType } from "../types/error";
import { getToken } from "../stores/authStore";

export const getUsers = async () => {
  try {
    const { data } = await httpClient.get("/user");
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`user get error`);
  }
};

export const authSignup = async (user: User) => {
  try {
    const response = await httpClient.post("/user/join", user);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const authResign = async () => {
  const response = await httpClient.delete(`/user`);
  return response;
};
interface LoginResponse {
  token: string;
  email: string;
  nickname: string;
  message: string;
}

export const authLogin = async (user: LoginProps): Promise<LoginResponse> => {
  try {
    const { data } = await httpClient.post<LoginResponse>("/user/login", user);
    return data;
  } catch (err) {
    const errorObj = err as ErrorType;
    if (errorObj.response.status === 400) {
      throw err;
    }
    throw err;
  }
};

export const isEmailUnique = async (email: isEmailProps) => {
  const response = await httpClient.post("/user/join/check", email);
  return response;
};

export interface authMessageResponse {
  message: string;
}

export const authLogout = async () => {
  const response = await httpClient.post<authMessageResponse>("/user/logout", {
    headers: {
      Authorization: getToken(),
    },
  });

  return response;
};
