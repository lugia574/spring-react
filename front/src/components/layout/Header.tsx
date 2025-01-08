// import { useState } from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import Title from "../common/Title";
import { Link } from "react-router-dom";
import { getEmail, useAuthStore } from "../../stores/authStore";
import { useUser } from "../../hook/useUser";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";

// interface Props {}

const Header = () => {
  const { userLogout } = useUser();
  const { isLoggedIn, storeLogout } = useAuthStore();
  const [userEmail, setUserEmail] = useState("");

  const logoutHandler = () => {
    userLogout().then(() => {
      storeLogout();
    });
  };

  useEffect(() => {
    const email = getEmail();
    if (email === "") return;
    setUserEmail(email);
  }, []);

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
                <div className="user-nav">
                  <Link to={`/users/${userEmail}`}>
                    <div className="nav-section">
                      <FaUser className="nav-icon" />
                      <span>내 정보</span>
                    </div>
                  </Link>
                  <div className="nav-section" onClick={logoutHandler}>
                    <FiLogOut className="nav-icon" />
                    <span>로그아웃</span>
                  </div>
                </div>
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

    .user-nav {
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      .nav-section {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
`;

export default Header;
