import { Link } from "react-router-dom";
import styled from "styled-components";
import { Post } from "../../model/Post.model";
import { getImgSrc } from "../../utils/image";
import Title from "./Title";
import { FaComment } from "react-icons/fa";
interface BoardProps {
  boardProp: Post;
}

const BestBoardCard = ({ boardProp }: BoardProps) => {
  return (
    <BestBoardCardStyle>
      <div className="bb-warrper">
        <Link to={`/post/${boardProp.boardNumber}`}>
          <div className="bb-image">
            <img src={getImgSrc(boardProp.boardNumber)} alt={getImgSrc(1)} />
          </div>
          <div className="bb-content">
            <div className="comment-container">
              <div className="comment-icon">
                <FaComment />
              </div>
              <div className="comment-counter">{boardProp.commentCount}</div>
            </div>
            <Title size="medium">{boardProp.title}</Title>
          </div>
        </Link>
      </div>
    </BestBoardCardStyle>
  );
};

const BestBoardCardStyle = styled.div`
  width: 20%;
  height: 100%;
  .bb-warrper {
    width: 100%;
    height: 100%;
    min-width: 100px;
    position: relative;
  }

  .bb-image {
    height: 8.5rem;
    position: absolute;
    z-index: -1;
    opacity: 0.9;
    width: 100%;
    img {
      border-radius: ${({ theme }) => theme.borderRadius.default};
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .bb-content {
    width: 100%;
    height: 8.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem;
    background: linear-gradient(
      330deg,
      rgba(255, 255, 255, 0.6),
      rgba(0, 0, 0, 0.1)
    );
  }
  .bb-content > h1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .comment-container {
    display: flex;
    justify-content: end;
    align-items: center;
    text-align: center;
    gap: 0.2rem;

    .comment-icon {
      margin-bottom: 0.2rem;
    }
  }
`;

export default BestBoardCard;
