import axios from "axios";
import { User } from "../model/User.model";
import { httpClient } from "./http";
import { isEmailProps, LoginProps } from "../pages/Login";

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
    const { data } = await axios.post("/api/join", user);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`user signup error`);
  }
};

export const authLogin = async (user: LoginProps) => {
  try {
    const { data } = await axios.post("/api/login", user);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`user login error`);
  }
};

export const isEmailUnique = async (email: isEmailProps) => {
  try {
    const { data } = await axios.post("api/isEmail", email);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`user emaill isEmail check error`);
  }
};

export const authLogout = async () => {};
