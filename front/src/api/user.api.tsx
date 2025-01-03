import axios from "axios";
import { User } from "../model/User.model";
import { httpClient } from "./http";
import { isEmailProps, LoginProps } from "../pages/LoginPage";
import { ErrorType } from "../types/error";

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
    const { data } = await httpClient.post("/user/join", user);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

interface loginMessageResponse {
  message: string;
}

export const authLogin = async (user: LoginProps) => {
  try {
    const response = await httpClient.post("/user/login", user);

    return response;
  } catch (err) {
    const errorObj = err as ErrorType;
    if (errorObj.response.status === 400) {
      return err;
    }
    console.log(err);
    throw err;
  }
};

export const isEmailUnique = async (email: isEmailProps) => {
  try {
    const response = await httpClient.post("/user/isEmail", email);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const authLogout = async () => {};
