import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import TopButton from "../common/TopButton";
import SideButton from "../common/SideButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <WrapperStyle>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
      <SideButton isWriting={true} />
    </WrapperStyle>
  );
};

const WrapperStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  width: 100%;
  max-width: 100%;
`;

const LayoutStyle = styled.main`
  flex: 1;
  margin-top: 6.3rem;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    /* padding: 0.5rem; */
  }
`;

export default Layout;
