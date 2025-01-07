import { create } from "zustand";

interface StoreState {
  nickName: string | null;
  isLoggedIn: boolean; // 상태 변수(state)
  storeLogin: (token: string, niname: string, email: string) => void; // 상태 변경 함수(action)
  storeLogout: () => void;
}

export const getNickName = () => {
  let userName = localStorage.getItem("nickName");
  if (userName === null) userName = "";
  return userName;
};

export const getToken = () => {
  let token = localStorage.getItem("token");
  if (token === null) token = "";
  return token; // 로컬 스토리지에 "token"필드가 없는 경우엔 null을 반환
};

export const getEmail = () => {
  let email = localStorage.getItem("email");
  if (email === null) email = "";
  return email;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const setUserEmail = (email: string) => {
  localStorage.setItem("email", email);
};

export const setNickName = (nickName: string) => {
  localStorage.setItem("nickName", nickName);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
export const removeEmail = () => {
  localStorage.removeItem("email");
};

export const removeNickName = () => {
  localStorage.removeItem("nickName");
};

export const useAuthStore = create<StoreState>((set) => ({
  nickName: getToken() ? getNickName() : null,
  isLoggedIn: getToken() ? true : false, // 초기값 설정
  storeLogin: (token: string, nickName: string, email: string) => {
    set({ isLoggedIn: true });
    setUserEmail(email);
    setNickName(nickName);
    setToken(token);
  },
  storeLogout: () => {
    set({ isLoggedIn: false });
    removeToken();
    removeEmail();
    removeNickName();
  },
}));
