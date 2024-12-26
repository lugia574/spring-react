/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { isEmailUnique, authLogin, authSignup } from "../api/user.api";
import { LoginProps } from "../pages/Login";
import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { User } from "../model/User.model";
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
    const res = await checkFunction(data);
    if (res.status === 200) {
      setUniqueCheck((prev) => !prev);
      clearErrors(field);
    }
    return res;
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

  const userLogin = async (user: LoginProps) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loginRes = await authLogin(user);
      // 코인 넣는 과정
      navigate("/");
      return;
    } catch (err: any) {
      throw new Error(`login error: ${err.response.data}}`);
    }
  };

  const userSignup = async (user: User) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await authSignup(user);
      navigate("/");
    } catch (err: any) {
      throw new Error(`error : ${err.response.data}`);
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
