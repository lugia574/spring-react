import styled from "styled-components";

export const CommentInputStyle = styled.div`
  .comment-warrper {
    position: relative;
    background-color: ${({ theme }) => theme.color.borderGray};
    border-radius: ${({ theme }) => theme.borderRadius.default};
  }
  .input-form {
    width: 100%;

    .textForm {
      border: none;
      width: 100%;
      height: 5rem;
      padding: 1rem;
    }
    .textForm:focus {
      outline: none;
    }

    .input-button {
      display: flex;
      justify-content: end;
      padding: 0 1rem 0.5rem 0;
    }
  }
`;
