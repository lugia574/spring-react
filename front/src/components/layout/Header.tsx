import { useState } from "react";
import styled from "styled-components";
// interface Props {}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderStyle>
      <div className="header">
        <div className="header-main">
          <div className="logo">Board</div>
          <nav className="desktop-nav">
            <div className="" onClick={() => {}}>
              로그인
            </div>
            <div className="modile-nav modile">
              <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                <div className="" onClick={() => {}}>
                  로그인
                </div>
              </nav>
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
    padding: 1rem 2rem;
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
    padding: 1rem 0;
  }
`;

export default Header;