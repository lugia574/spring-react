import styled from "styled-components";
import { Button } from "./Button";
// interface Props {}

const WriteInput = () => {
  return (
    <WriteInputStyle>
      <div className="write-warrper">
        <form className="write-form" onSubmit={() => {}}>
          <textarea className="textForm"></textarea>
          <div className="write-button">
            <Button
              $radius="default"
              $size="medium"
              type="submit"
              children={"작성"}
              $scheme={"secondary"}
            />
          </div>
        </form>
      </div>
    </WriteInputStyle>
  );
};

const WriteInputStyle = styled.div`
  .write-warrper {
    position: relative;
    background-color: ${({ theme }) => theme.color.borderGray};
    border-radius: ${({ theme }) => theme.borderRadius.default};
  }
  .write-form {
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

    .write-button {
      display: flex;
      justify-content: end;
      padding: 0 1rem 0.5rem 0;
    }
  }
`;

export default WriteInput;
