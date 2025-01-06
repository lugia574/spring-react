import { useParams } from "react-router-dom";
import styled from "styled-components";
import Title from "../components/common/Title";
import Comment from "../components/common/Comment";
import { getImgSrc } from "../utils/image";
import CommentInput from "../components/common/CommentInput";
import { usePost } from "../hook/usePost";

const PostDetailPage = () => {
  const { id } = useParams();
  const postId = id && /^[0-9]+$/.test(id || "") ? parseInt(id, 10) : 0;

  const { usePostDetail } = usePost();
  const { data, isLoading } = usePostDetail(postId);

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
                <span className="post-wirter">{data?.writer_email}</span>
                <span className="post-date">{data?.writer_datetime}</span>
              </div>
            </div>
            <div className="post-main">
              <div className="post-img">
                <img src={getImgSrc(100)} alt={getImgSrc(1)} />
              </div>
              <div className="post-content">{data?.content}</div>
            </div>
          </div>
        )}
        <div className="post-comment">
          <div className="comment-info">
            <span> 댓글 💬</span>
          </div>
          <div className="comment-list">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>

          <div className="comment-write">
            <CommentInput />
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
