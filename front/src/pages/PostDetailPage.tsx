import { useParams } from "react-router-dom";
import styled from "styled-components";
import Title from "../components/common/Title";
import Comment from "../components/common/Comment";
import { getImgSrc } from "../utils/image";
import { usePost } from "../hook/usePost";
import { useCommentList, useCommet } from "../hook/useComment";
import { convertDateToISOString } from "../utils/convertDataType";
import { useEffect, useState } from "react";
import { Button } from "../components/common/Button";
import { CommentInputStyle } from "../components/common/CommentInput";
import { Comment as IComment } from "../model/Comment.model";
import { getEmail, getNickName } from "../stores/authStore";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";

const PostDetailPage = () => {
  const { id } = useParams();
  const postId = id && /^[0-9]+$/.test(id || "") ? parseInt(id, 10) : 0;
  const { postComment } = useCommet();
  const [inputText, setInputText] = useState("");

  const { usePostDetail, deletePost } = usePost();
  const { data, isLoading } = usePostDetail(postId);
  const { comments, commentRefetch } = useCommentList(postId);
  const [isMyPost, setIsMyPost] = useState(false);

  const [postCommentList, setPostCommentList] = useState<IComment[]>([]);

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText === "") return;
    postComment(inputText, postId);
    setPostCommentList((prev) => {
      const newComment: IComment = {
        userNickname: getNickName(),
        commentContent: inputText,
      };

      const newList: IComment[] = [];
      prev.map((item) => newList.push(item));
      newList.push(newComment);
      return newList;
    });
    setInputText("");
  };

  const handleDeletePost = () => {
    console.log(postId);
    deletePost(postId);
  };

  useEffect(() => setPostCommentList(comments), [comments]);
  useEffect(() => {
    const myEmail = getEmail();
    if (data?.writerEmail === myEmail) setIsMyPost(true);
  }, [data]);

  // const commentList = useCommentList(postId);
  return (
    <PostDetailStyle>
      <div className="Postwarrper">
        {isLoading ? (
          <></>
        ) : (
          <div className="post">
            <div className="post-header">
              <Title size="large">{data?.title}</Title>
              <div className="post-info">
                <span className="post-wirter">{data?.writerEmail}</span>
                <span className="post-date">
                  {convertDateToISOString(
                    data?.writerDatetime ? data?.writerDatetime : ""
                  )}
                </span>
              </div>
            </div>
            <div className="post-main">
              {isMyPost && (
                <div className="post-nav">
                  <FaPen className="post-nav-icon" />
                  <FaRegTrashAlt
                    className="post-nav-icon"
                    onClick={handleDeletePost}
                  />
                </div>
              )}
              <div className="post-img">
                <img src={getImgSrc(100)} alt={getImgSrc(1)} />
              </div>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{
                  __html: data?.content ? data?.content : "",
                }}
              ></div>
            </div>
          </div>
        )}
        <div className="post-comment">
          <div className="comment-info">
            <span> 댓글 💬</span>
          </div>
          <div className="comment-list">
            {postCommentList.map((comment, idx) => (
              <Comment
                key={idx}
                commentProp={comment}
                refetch={commentRefetch}
              />
            ))}
          </div>

          <div className="comment-write">
            <CommentInputStyle>
              <div className="comment-warrper">
                <form className="input-form" onSubmit={handleCommentSubmit}>
                  <textarea
                    className="textForm"
                    onChange={(e) => setInputText(e.target.value)}
                    value={inputText}
                  ></textarea>
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
          </div>
        </div>
      </div>
    </PostDetailStyle>
  );
};

const PostDetailStyle = styled.div`
  .Postwarrper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .post {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .post-header {
    width: 70%;
    height: auto;

    .post-info {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
    }
  }

  .post-main {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: left;
    min-height: 10rem;
    padding: 2rem;

    .post-nav {
      display: flex;
      justify-content: end;
      gap: 1rem;
      align-items: center;
      .post-nav-icon {
        cursor: pointer;
      }
    }

    .post-img > img {
      width: 70%;
    }
    .post-content {
      width: 100%;
    }
  }
  .post-comment {
    width: 70%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${({ theme }) => theme.color.black};
    padding: 0.5rem 0 2rem 0;
    gap: 1rem;
  }
`;

export default PostDetailPage;
