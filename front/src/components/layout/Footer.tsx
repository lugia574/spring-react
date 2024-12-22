import styled from "styled-components";
// interface Props {}

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer">
        <div className="footer-logo"></div>
        <div className="footer-content">
          <span>2024, lcw copyrightⓒ</span>
        </div>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.color.primary};
  border-top: 1px solid ${({ theme }) => theme.color.borderGray};
  padding: 0.5rem 0;
`;

export default Footer;
