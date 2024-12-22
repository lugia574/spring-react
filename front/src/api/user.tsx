import axios from "axios";
import { User } from "../model/User.model";
import { httpClient } from "./http";

export const getUsers = async () => {
  try {
    const { data } = await httpClient.get("/user");
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
  }
};

export const createUser = async (user: User) => {
  try {
    const { data } = await axios.post("/api/join", user);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
  }
};

export const authLogin = async () => {};

export const authLogout = async () => {};

export const isEmailUnique = async () => {};
