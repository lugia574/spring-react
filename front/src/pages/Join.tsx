import { LoginStyle } from "./Login";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { joinFormProps } from "../model/User.model";
import { useState } from "react";
import { emailRegex } from "../constants/regexPatterns";
import { allowedDomains } from "../constants/domains";
import { useUser } from "../hook/useUser";
import {
  emailOptions,
  nicknameOptions,
  passwordOptions,
} from "../constants/registerOptions";
import { Button } from "../components/common/Button";
import { Link } from "react-router-dom";

export const placeholderHander = (text: string) => {
  return `${text} 입력해주세요.`;
};

export const domainAuth = (email: string) => {
  const [, domain] = email.split("@");
  if (allowedDomains.includes(domain)) return true;
  return false;
};

const Join = () => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<joinFormProps>();
  const [emailUniqueCheck, setEmailUniqueCheck] = useState(false);
  const [nicknameUniqueCheck, setNicknameUniqueCheck] = useState(false);
  const { userEmailCheck, userSignup } = useUser();

  const checkEmail = async () => {
    const email = getValues().email;
    if (email == undefined || !emailRegex.test(email)) {
      setError(
        "email",
        { message: "이메일형식이 올바르지 않습니다." },
        { shouldFocus: true }
      );
      return;
    }
    if (!domainAuth(email)) {
      setError(
        "email",
        { message: "허용되지 않는 이메일 도메인입니다." },
        { shouldFocus: true }
      );
      return;
    }

    await userEmailCheck({ email, setEmailUniqueCheck, clearErrors, setError });
  };

  const onSubmit = (data: joinFormProps) => {
    if (!emailUniqueCheck) {
      setError(
        "email",
        { message: "이메일 중복 검사를 먼저 해주세요." },
        { shouldFocus: true }
      );
      return;
    }
    if (data.password === undefined || data.passwordConfirm === undefined)
      return;

    // 비밀번호 대조
    if (data.password === data.passwordConfirm) {
      userSignup(data);
    } else {
      setError(
        "passwordConfirm",
        { message: "비밀번호가 일치 하지 않습니다." },
        { shouldFocus: true }
      );
    }
  };

  return (
    <LoginStyle>
      <Title size="large">회원가입</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="input-section">
          <InputText
            placeholder={placeholderHander("이메일을")}
            inputType="email"
            {...register("email", emailOptions)}
            isButton={true}
            buttonText={emailUniqueCheck ? "인증 완료" : "중복 확인"}
            onConfirm={checkEmail}
            onChange={() => setEmailUniqueCheck(false)}
            isDisabled={emailUniqueCheck ? true : false}
          />
          {errors.email && (
            <small className="error-text">{errors.email.message}</small>
          )}
          {emailUniqueCheck && (
            <small className="success-text">사용 가능한 이메일입니다!</small>
          )}
        </fieldset>
        <fieldset className="input-section">
          <InputText
            placeholder={placeholderHander("닉네임을")}
            inputType="text"
            {...register("nickname", nicknameOptions)}
            buttonText={nicknameUniqueCheck ? "인증 완료" : "중복 확인"}
            onChange={() => setNicknameUniqueCheck(false)}
            isDisabled={nicknameUniqueCheck ? true : false}
          />
          {errors.nickname && (
            <small className="error-text">{errors.nickname.message}</small>
          )}
        </fieldset>
        <fieldset className="input-section">
          <InputText
            placeholder={placeholderHander("비밀번호를")}
            inputType="password"
            $inputsize="large"
            {...register("password", passwordOptions)}
          />
          {errors.password && (
            <small className="error-text">{errors.password.message}</small>
          )}
        </fieldset>
        <fieldset className="input-section">
          <InputText
            placeholder={placeholderHander("비밀번호 확인")}
            inputType="password"
            $inputsize="large"
            {...register("passwordConfirm", passwordOptions)}
          />
          {errors.passwordConfirm && (
            <small className="error-text">
              {errors.passwordConfirm.message}.
            </small>
          )}
        </fieldset>
        <fieldset className="input-section">
          <Button $scheme="primary" $radius="default" $size={"large"}>
            회원가입
          </Button>
        </fieldset>

        <div className="login-info">
          <div className="join-login">
            <span>가입되어 있으신가요?</span>
            <div className="login-link">
              {/* <UserIcon /> */}
              <Link to="/login">로그인하러 가기</Link>
            </div>
          </div>
        </div>
      </form>
    </LoginStyle>
  );
};

// const JoinStyle = styled.div``;

export default Join;
