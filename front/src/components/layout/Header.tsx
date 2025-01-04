// import { useState } from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import Title from "../common/Title";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useUser } from "../../hook/useUser";
// interface Props {}

const Header = () => {
  const { userLogout } = useUser();
  const { isLoggedIn, storeLogout } = useAuthStore();

  const logoutHandler = () => {
    userLogout().then(() => {
      storeLogout();
    });
  };

  return (
    <HeaderStyle>
      <div className="header">
        <div className="header-main">
          <div className="logo">
            <Link to={`/`}>
              <Title size="large">Board</Title>
            </Link>
          </div>
          <nav className="desktop-nav">
            <div className="">
              {isLoggedIn ? (
                <Button
                  $size="medium"
                  $radius="default"
                  type="button"
                  $scheme="normal"
                  onClick={logoutHandler}
                >
                  로그아웃
                </Button>
              ) : (
                <Link to={`/login`}>
                  <Button
                    $size="medium"
                    $radius="default"
                    type="button"
                    $scheme="normal"
                  >
                    로그인
                  </Button>
                </Link>
              )}
            </div>
            <div className="modile-nav modile">
              {/* <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                <div className="" onClick={() => {}}>
                  로그인
                </div>
              </nav> */}
            </div>
          </nav>
        </div>
      </div>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  .header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.black};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100000;
    font-weight: 600;
  }

  .header-main {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    h1 {
      margin: 0;
    }
  }
`;

export default Header;
