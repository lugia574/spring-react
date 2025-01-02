import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";

interface WriteTopBtnProps {
  isWriting: boolean;
}

const SideButton: React.FC<WriteTopBtnProps> = ({ isWriting }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <SideButtonStyle>
      {isWriting && (
        <Button
          $size="large"
          $scheme="primary"
          $radius="cicle"
          onClick={() => (window.location.href = "/write")}
          className="write-btn"
        >
          작성
        </Button>
      )}
      <Button
        $size="medium"
        $radius="cicle"
        $scheme="normal"
        onClick={scrollToTop}
        className={isVisible ? "top-btn visible" : "top-btn hidden"}
      >
        TOP
      </Button>
    </SideButtonStyle>
  );
};

const SideButtonStyle = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  min-height: 50px;

  .top-btn,
  .write-btn {
    padding: 1rem;
  }

  .visible {
    visibility: visible;
  }
  .hidden {
    visibility: hidden;
  }

  button {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      opacity: 1;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    /* bottom: 20px;
    right: 20px; */
  }
`;

export default SideButton;
