import { create } from "zustand";

interface StoreState {
  nickName: string | null;
  isLoggedIn: boolean; // 상태 변수(state)
  storeLogin: (token: string, niname: string, email: string) => void; // 상태 변경 함수(action)
  storeLogout: () => void;
}

export const getNickName = () => {
  const userName = localStorage.getItem("nickName");
  return userName;
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token; // 로컬 스토리지에 "token"필드가 없는 경우엔 null을 반환
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
