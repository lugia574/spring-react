/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { isEmailUnique, authLogin, authSignup } from "../api/user.api";
import { LoginProps } from "../pages/LoginPage";
import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { User } from "../model/User.model";
import { useAuthStore } from "../stores/authStore";
// 공통 인터페이스 정의
interface UserCheckProps {
  clearErrors: UseFormClearErrors<any>;
  setError: UseFormSetError<any>;
}

// 이메일 체크 인터페이스 정의
interface UserEmailCheckProps extends UserCheckProps {
  email: string;
  setEmailUniqueCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

// 공통 에러 핸들러
export const fetchErrorStatusHandler = (error: any, statusList: number[]) => {
  if (statusList.includes(error.response.status)) {
    return error.response;
  } else {
    throw new Error(`error : ${error.response.data}`);
  }
};

// 공통 체크 핸들러
const handleUserCheck = async <T,>(
  checkFunction: (data: T) => Promise<any>,
  data: T,
  field: string,
  setUniqueCheck: React.Dispatch<React.SetStateAction<boolean>>,
  clearErrors: UseFormClearErrors<any>,
  setError: UseFormSetError<any>
) => {
  try {
    const response = await checkFunction(data);
    if (response.status === 200) {
      setUniqueCheck((prev) => !prev);
      clearErrors(field);
    }
    return response;
  } catch (error: any) {
    if (error.status === 409) {
      setError(field, { message: error.data.message }, { shouldFocus: true });
      return;
    } else if (error.status === 400) {
      //   showAlert(error.data.message, "error");
      throw new Error(`error : ${error.response.data}`);
      return;
    }
    return fetchErrorStatusHandler(error, []);
  }
};

export const useUser = () => {
  const navigate = useNavigate();
  const { storeLogin } = useAuthStore();

  const userLogin = async (user: LoginProps) => {
    try {
      const loginRes = await authLogin(user);
      const newAccessToken = loginRes.headers["authorization"];
      const token = newAccessToken.split(" ")[1];
      const userId = loginRes.data.userId;
      storeLogin(token, userId);
      navigate("/");
      navigate("/");
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const userSignup = async (user: User) => {
    try {
      const response = await authSignup(user);
      if (response.status === 201) navigate("/");
      else throw new Error(`error : ${response.body}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const userEmailCheck = async ({
    email,
    setEmailUniqueCheck,
    clearErrors,
    setError,
  }: UserEmailCheckProps) => {
    return handleUserCheck(
      isEmailUnique,
      { email },
      "email",
      setEmailUniqueCheck,
      clearErrors,
      setError
    );
  };

  return { userLogin, userSignup, userEmailCheck };
};
