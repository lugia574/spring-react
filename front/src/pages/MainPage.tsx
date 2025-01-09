import styled from "styled-components";
import Title from "../components/common/Title";
import BoardCard from "../components/common/BoardCard";
import BestBoardCard from "../components/common/BestBoardCard";
import SideButton from "../components/common/SideButton";
import { usePost } from "../hook/usePost";
import InputText from "../components/common/InputText";
import { Button } from "../components/common/Button";
import { useEffect, useState } from "react";

// import { useEffect } from "react";
// interface Props {}

const MainPage = () => {
  const { useAllPost, useTop5Post, useSearchPost } = usePost();
  const { posts } = useAllPost();
  const { data } = useTop5Post();
  const [searchType, setSearchType] = useState("제목");
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { searchData } = useSearchPost(searchType, keyword);

  const postSwitch = () => {
    setIsSearching(false);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (keyword.trim() === "") {
      postSwitch();
    } else {
      setIsSearching(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 모바일 기준 화면 너비 조정
    };

    // 초기 실행 및 이벤트 등록
    handleResize();
    window.addEventListener("resize", handleResize);

    // 클린업
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MainStyle>
      <div className="main">
        <div className="main-best">
          <Title size="medium">👍 베스트 포스트</Title>

          <div className="best-content-list">
            {data?.map((post, idx) =>
              isMobile ? (
                <BoardCard key={idx} boardProp={post} /> // 모바일일 경우 BoardCard 사용
              ) : (
                <BestBoardCard key={idx} boardProp={post} /> // 기본 BestBoardCard 사용
              )
            )}
          </div>
        </div>
        <div className="main-content">
          <div className="content-list-nav">
            <div className="totalpost-btn" onClick={postSwitch}>
              <Title size="medium">📄 전체 게시글</Title>
            </div>
            <form className="select-input" onSubmit={handleSearch}>
              <select
                className="search-select"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option>제목</option>
                <option>닉네임</option>
                <option>내용</option>
              </select>
              <InputText
                placeholder="검색어를 입력해주세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div className="search-icon">
                <Button
                  $radius="default"
                  $scheme="normal"
                  $size="medium"
                  type="submit"
                >
                  검색
                </Button>
              </div>
            </form>
          </div>
          {isSearching
            ? searchData.map((post, idx) => (
                <BoardCard key={idx} boardProp={post} />
              ))
            : posts.map((post, idx) => (
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

    .content-list-nav {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .totalpost-btn {
        cursor: pointer;
        display: flex;
        width: 8rem;
      }

      .select-input {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
      }

      .search-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          height: 40px;
        }
      }

      select {
        padding: 0.2rem 0.75rem;
        border: 1px solid ${({ theme }) => theme.color.borderGray};
        border-radius: ${({ theme }) => theme.borderRadius.default};
        font-size: 1rem;
        line-height: 1.5;
        height: 40px;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .main {
      margin: 0rem;
    }

    .main-best,
    .main-content {
      width: 100%;
      height: auto;
    }

    .best-content-list {
      flex-direction: column;
    }
  }
`;

export default MainPage;
