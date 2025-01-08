import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getEmail } from "../stores/authStore";
import { useUser } from "../hook/useUser";
import InputText from "../components/common/InputText";
import { getImgSrc } from "../utils/image";
import { Button } from "../components/common/Button";
import Title from "../components/common/Title";
import BoardCard from "../components/common/BoardCard";
import { Post } from "../model/Post.model";
import { Comment as IComment } from "../model/Comment.model";
import Comment from "../components/common/Comment";
// interface Props {}

const TEST_POST: Post = {
  boardNumber: 1,
  commentCount: 2,
  content: "",
  favoriteCount: 4,
  title: "이것은 test",
  viewCount: 12,
  writerDatetime: "123",
  writerEmail: "lcw@test.com",
};

const TEST_COMMENT: IComment = {
  boardNumber: 1,
  commentContent: "이건 test comment",
  userNickname: "tester",
  commentNumber: 1,
  userEmail: "lcw@test.com",
  writeDatetime: "1231",
};

const UserPage = () => {
  const { userEmail } = useParams();
  const [isMypage, setIsMypage] = useState(false);
  const { userResign } = useUser();
  const [activeTag, setActiveTag] = useState(true);

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
            {/* {isMypage && <span>이미지 기능 미구현</span>} */}
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
          <div className="tag-nav">
            <Button
              $radius="tabContainer"
              $scheme={activeTag ? "primary" : "normal"}
              $size="large"
              onClick={() => setActiveTag((prev) => !prev)}
            >
              포스트
            </Button>
            <Button
              $radius="tabContainer"
              $scheme={activeTag ? "normal" : "primary"}
              $size="large"
              onClick={() => setActiveTag((prev) => !prev)}
            >
              댓글
            </Button>
          </div>
          {activeTag ? (
            <div className="user-post">
              <BoardCard boardProp={TEST_POST} />
              <BoardCard boardProp={TEST_POST} />
            </div>
          ) : (
            <div className="user-comment">
              {/* 이건 Link 를 위에 덧씌워야함 글고 props 를 추가해서 userPage 에서는 지우기 icons 를 없애자 */}
              <Comment
                commentProp={TEST_COMMENT}
                refetch={() => {}}
                isDeleteIcon={false}
              />
            </div>
          )}
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
    gap: 5rem;
  }
  .user-info {
    display: flex;
    width: 100%;
    padding: 1rem;
    justify-content: start;
    gap: 10rem;
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

  .profile-resign {
    display: flex;
    gap: 1rem;
    color: ${({ theme }) => theme.color.commentGray};
  }

  .update-button {
    display: flex;
    justify-content: end;
  }

  .user-works {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .post {
    }
    .user-info {
      flex-direction: column;
    }
  }
`;

export default UserPage;
