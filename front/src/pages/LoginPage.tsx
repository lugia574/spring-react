import styled from "styled-components";
import { useUser } from "../hook/useUser";
import Title from "../components/common/Title";
import { useForm } from "react-hook-form";
import InputText from "../components/common/InputText";
import { Button } from "../components/common/Button";
import { Link } from "react-router-dom";
export interface LoginProps extends isEmailProps {
  password: string;
}

export interface isEmailProps {
  email: string;
}

const LoginPage = () => {
  const { userLogin } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    userLogin(data);
    return;
  };

  return (
    <LoginStyle>
      <Title size="xlarge">로그인</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <InputText
            placeholder="이메일"
            inputType="email"
            {...register("email", { required: true })}
            inputMode="email"
          />
          {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
        </fieldset>
        <fieldset>
          <InputText
            placeholder="비밀번호"
            inputType="password"
            {...register("password", { required: true })}
            inputMode="text"
          />
          {errors.password && (
            <p className="error-text">비밀번호을 입력해주세요.</p>
          )}
        </fieldset>
        <fieldset>
          <Button
            type="submit"
            $size="medium"
            $scheme="primary"
            $radius={"default"}
          >
            로그인
          </Button>
          <div className="join-link">
            {/* <UserIcon /> */}
            <Link to="/join">회원가입 가기</Link>
          </div>
        </fieldset>
      </form>
    </LoginStyle>
  );
};

export const LoginStyle = styled.div`
  max-width: 450px;
  margin: 40px auto;
  min-height: 450px;
  padding: 2.5rem;
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }

  .login-info {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.commentGray};
    gap: 1rem;
    .login-link {
      display: flex;
      justify-content: center;
    }
  }

  .join-link {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;

export default LoginPage;
