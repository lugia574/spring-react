import styled from "styled-components";
import Title from "../components/common/Title";
import BoardCard from "../components/common/BoardCard";
import BestBoardCard from "../components/common/BestBoardCard";
import SideButton from "../components/common/SideButton";
import { usePost } from "../hook/usePost";

// import { useEffect } from "react";
// interface Props {}

const MainPage = () => {
  const { useAllPost, useTop5Post } = usePost();
  const { posts } = useAllPost();
  const { data } = useTop5Post();
  return (
    <MainStyle>
      <div className="main">
        <div className="main-best">
          <Title size="medium">👍 베스트 포스트</Title>
          <div className="best-content-list">
            {data?.map((post, idx) => (
              <BestBoardCard key={idx} boardProp={post} />
            ))}
          </div>
        </div>
        <div className="main-content">
          <Title size="medium">📄 전체 게시글</Title>
          {posts.map((post, idx) => (
            <BoardCard key={idx} boardProp={post} />
          ))}
        </div>
        <div className="">{}</div>
      </div>
      <SideButton isWriting={true} />
    </MainStyle>
  );
};

const MainStyle = styled.div`
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .main-best {
    width: 70%;
    height: 200px;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0.5em;
    .best-content-list {
      display: flex;
      justify-content: space-around;
      height: auto;
      width: 100%;
      overflow: hidden;
      /* flex-wrap: wrap; */
      gap: 0.5rem;

      /* background-color: saddlebrown; */
    }
  }

  .main-content {
    width: 70%;
    height: 800px;
    padding: 0 0.5em;
    /* background-color: rebeccapurple; */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .main-content :first-child {
      border-bottom: solid 1px rebeccapurple;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .main {
      margin: 0rem;
    }

    .main-best,
    .main-content {
      width: 100%;
    }
  }
`;

export default MainPage;
