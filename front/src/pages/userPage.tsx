import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getEmail } from "../stores/authStore";
import { useUser } from "../hook/useUser";
import InputText from "../components/common/InputText";
import { getImgSrc } from "../utils/image";
import { Button } from "../components/common/Button";
import Title from "../components/common/Title";
// interface Props {}

const UserPage = () => {
  const { userEmail } = useParams();
  const [isMypage, setIsMypage] = useState(false);
  const { userResign } = useUser();

  const handleUserUpdate = () => {};

  const handleResign = () => {
    userResign();
  };
  useEffect(() => {
    const tokenEmail = getEmail();
    if (tokenEmail === "") return;
    if (userEmail === tokenEmail) {
      setIsMypage(true);
    }
  }, []);
  return (
    <UserPageStyle>
      <div className="userPage-main">
        <form onSubmit={handleUserUpdate} className="user-info">
          <div className="user-info-left profile">
            <span className="profile-lavel">
              <Title size="large">프로필</Title>
            </span>
            <img className="profile-img" src={getImgSrc(50)} />
            {isMypage && <span>이미지 기능 미구현</span>}
          </div>
          <div className="user-info-right">
            <div className="input-section">
              <div className="info-nickname">
                <span className="nickname-label">닉네임</span>
                {isMypage ? <InputText /> : <span>유저닉네임</span>}
              </div>
              <div className="update-button">
                {isMypage && (
                  <Button $radius="default" $size="small" $scheme="primary">
                    수정하기
                  </Button>
                )}
              </div>
            </div>
            <div className="profile-resign">
              <span>회원 정보를 삭제하시겠어요?</span>
              <span onClick={() => handleResign()}>회원 탈퇴</span>
            </div>
          </div>
        </form>
        <div className="user-works">
          <div className="user-post"></div>
        </div>
      </div>
    </UserPageStyle>
  );
};

const UserPageStyle = styled.div`
  display: flex;
  justify-content: center;
  .userPage-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
  }
  .user-info {
    display: flex;
    width: 100%;
    padding: 1rem;
    justify-content: space-around;
  }
  .profile {
    display: flex;
    flex-direction: column;
  }
  .profile-img {
    width: 200px;
    height: 200px;
    background-size: cover;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.color.borderGray};
  }

  .user-info-right {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .input-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  .update-button {
    display: flex;
    justify-content: end;
  }
`;

export default UserPage;
