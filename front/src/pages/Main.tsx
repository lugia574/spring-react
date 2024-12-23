import styled from "styled-components";
import Title from "../components/common/Title";
import BoardCard from "../components/common/BoardCard";
import { Post } from "../model/Post.model";
// import { usePost } from "../hook/postHook";
// import { useEffect } from "react";
// interface Props {}

const posts: Post[] = [
  {
    board_number: 1,
    comment_count: 2,
    content: "안녕",
    favorite_count: 1,
    title: "안녕하세뇨",
    view_count: 5,
    writer_datetime: "2024-12-23",
    writer_email: "test@tes.com",
  },
  {
    board_number: 2,
    comment_count: 2,
    content: "안녕",
    favorite_count: 1,
    title: "안녕하세뇨",
    view_count: 5,
    writer_datetime: "2024-12-23",
    writer_email: "test@tes.com",
  },
  {
    board_number: 3,
    comment_count: 2,
    content: "안녕",
    favorite_count: 1,
    title: "안녕하세뇨",
    view_count: 5,
    writer_datetime: "2024-12-23",
    writer_email: "test@tes.com",
  },
  {
    board_number: 4,
    comment_count: 2,
    content: "안녕",
    favorite_count: 1,
    title: "안녕하세뇨",
    view_count: 5,
    writer_datetime: "2024-12-23",
    writer_email: "test@tes.com",
  },
];

const Main = () => {
  // const { posts } = usePost();

  return (
    <MainStyle>
      <div className="main">
        <div className="main-best">
          <Title size="medium">베스트 글</Title>
          <div className="best-content-list"></div>
        </div>
        <div className="main-content">
          <Title size="medium">전체 게시글</Title>
          {posts.map((post, idx) => (
            <BoardCard key={idx} boardProp={post} />
          ))}
        </div>
        <div className="">{}</div>
      </div>
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
    background-color: seagreen;
    .best-content-list {
      height: 140px;
      width: 100%;

      background-color: saddlebrown;
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
    .main-best {
      background-color: red;
    }
  }
`;

export default Main;
