import styled from "styled-components";
import { getImgSrc } from "../../utils/image";
import { Comment as IComment } from "../../model/Comment.model";
import { convertDateToISOString } from "../../utils/convertDataType";
import { useEffect, useState } from "react";
import { getEmail } from "../../stores/authStore";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteCommentApi } from "../../api/comment.api";
interface CommentProp {
  commentProp: IComment;
  refetch: () => void;
  isDeleteIcon: boolean;
}

const Comment = ({ commentProp, refetch, isDeleteIcon }: CommentProp) => {
  const [myComment, setMyComment] = useState(false);

  const handleDeleteComment = async () => {
    console.log("실행됐어요", commentProp.commentNumber);
    if (commentProp.commentNumber === undefined) return;
    await deleteCommentApi(commentProp.commentNumber);
    refetch();
  };
  useEffect(() => {
    const email = getEmail();
    if (email == commentProp.userEmail) setMyComment(true);
  }, []);
  return (
    <CommentStyle>
      <div className="comment-info">
        <div className="comment-profile">
          <div className="comment-img">
            <img src={getImgSrc(Math.floor(Math.random() * 11))} alt="" />
          </div>
          <div className="comment-writer">{commentProp.userNickname}</div>
        </div>

        <div className="comment-date">
          {convertDateToISOString(
            commentProp.writeDatetime ? commentProp.writeDatetime : ""
          )}
        </div>
      </div>
      <div className="comment-content">
        {commentProp.commentContent}

        {myComment && isDeleteIcon && (
          <div className="comment-nav">
            <div className="comment-delete">
              <FaRegTrashAlt onClick={handleDeleteComment} />
            </div>
          </div>
        )}
      </div>
    </CommentStyle>
  );
};

const CommentStyle = styled.div`
  width: 100%;
  .comment-info {
    display: flex;
    width: 100%;
    padding: 0.5rem 0 0 0;
    justify-content: space-between;

    .comment-profile {
      display: flex;
      gap: 0.5rem;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }

      .comment-writer {
        padding-top: 0.2rem;
      }
    }
  }
  .comment-content {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.commentGray};
  }

  .comment-nav {
    display: flex;
    gap: 0.5rem;

    .comment-update,
    .comment-delete {
      cursor: pointer;
    }
  }
`;

export default Comment;
