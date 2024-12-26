import styled from "styled-components";
import { Button } from "./Button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface CommentInputProps {
  comment: string;
}

const CommentInput = () => {
  const [inputText, setInputText] = useState("");
  const { register, handleSubmit } = useForm<CommentInputProps>();

  const onSubmit: SubmitHandler<CommentInputProps> = (data) => {
    console.log(data.comment);
  };
  return (
    <CommentInputStyle>
      <div className="comment-warrper">
        <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className="textForm"
            {...register("comment", { required: true })}
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          >
            {/* {errors.comment && <p className="error-text">입력해 ㅅㄲ야</p>} */}
          </textarea>
          <div className="input-button">
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
    </CommentInputStyle>
  );
};

const CommentInputStyle = styled.div`
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

export default CommentInput;
