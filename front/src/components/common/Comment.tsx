import styled from "styled-components";
import { getImgSrc } from "../../utils/image";
// interface Props {}

const Comment = () => {
  return (
    <CommentStyle>
      <div className="comment-info">
        <div className="comment-profile">
          <div className="comment-img">
            <img src={getImgSrc(5)} alt="" />
          </div>
          <div className="comment-writer">댓글쓴 사람</div>
        </div>
        <div className="comment-date">2024-12-24</div>
      </div>
      <div className="comment-content">
        이거슨 댓글이랍니다 댓글을 보면 기부니가 더 조아연 오홍홍
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
    padding: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.commentGray};
  }
`;

export default Comment;
