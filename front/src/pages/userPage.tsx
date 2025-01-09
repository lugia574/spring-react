import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getEmail } from "../stores/authStore";
import { useUser } from "../hook/useUser";
import InputText from "../components/common/InputText";
import { getImgSrc } from "../utils/image";
import { Button } from "../components/common/Button";
import Title from "../components/common/Title";
import BoardCard from "../components/common/BoardCard";
import Comment from "../components/common/Comment";
import { usePost } from "../hook/usePost";
import { useCommentList } from "../hook/useComment";
import { Comment as ICommet } from "../model/Comment.model";
// interface Props {}

const UserPage = () => {
  const { userEmail } = useParams();
  const { userResign } = useUser();
  const { useSearchPost } = usePost();
  const [isMypage, setIsMypage] = useState(false);
  const [activeTag, setActiveTag] = useState(true);
  const { searchData } = useSearchPost("닉네임", userEmail ? userEmail : "");
  const { comments } = useCommentList(undefined, userEmail);

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
              {searchData.map((item, idx) => (
                <BoardCard key={idx} boardProp={item} />
              ))}
            </div>
          ) : (
            <div className="user-comment">
              {comments.map((item: ICommet, idx: number) => (
                <Link to={`/post/${item.boardNumber}`} key={idx}>
                  <Comment
                    commentProp={item}
                    refetch={() => {}}
                    isDeleteIcon={false}
                  />
                </Link>
              ))}
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
  .info-nickname {
    display: flex;
    justify-content: space-between;
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
