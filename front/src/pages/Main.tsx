import styled from "styled-components";
import { usePost } from "../hook/postHook";
// import { useEffect } from "react";
// interface Props {}

const Main = () => {
  const { posts } = usePost();

  return (
    <MainStyle>
      <div className="main">
        <div className="main-content">
          {posts.map((post, idx) => (
            <div key={idx}>{post.title}</div>
          ))}
          먼데
        </div>
        <div className="">{}</div>
      </div>
    </MainStyle>
  );
};

const MainStyle = styled.div`
  .main {
    margin-top: 2rem;
    width: 100%;
  }
`;

export default Main;
