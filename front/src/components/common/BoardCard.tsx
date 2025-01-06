import styled from "styled-components";
import Title from "./Title";
import { Post } from "../../model/Post.model";
import { getImgSrc } from "../../utils/image";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
interface BoardProps {
  boardProp: Post;
}

const BoardCard = ({ boardProp }: BoardProps) => {
  return (
    <BoardCardStyle>
      <Link to={`/post/${boardProp.boardNumber}`}>
        <div className="board-warrper">
          <div className="board-image">
            <img src={getImgSrc(boardProp.boardNumber)} alt={getImgSrc(1)} />
          </div>
          <div className="board-content">
            <div className="board-title">
              <Title size="xsmall">{boardProp.title}</Title>
              <div className="comment-container">
                <div className="comment-icon">
                  <FaComment />
                </div>
                <div className="comment-counter">{boardProp.commentCount}</div>
              </div>
            </div>
            <div className="board-info">
              <span className="board-writer">{boardProp.writerEmail}</span>
              <span className="board-favorite">{boardProp.favoriteCount}</span>
              <span className="board-date">{boardProp.writerDatetime}</span>
            </div>
          </div>
        </div>
      </Link>
    </BoardCardStyle>
  );
};

const BoardCardStyle = styled.div`
  .board-warrper {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 4.5rem;
    padding: 0.2rem;
    gap: 0.5rem;
    border-bottom: solid 1px ${({ theme }) => theme.color.black};
  }

  .board-image {
    width: 3rem;
    height: 3rem;
    img {
      border-radius: ${({ theme }) => theme.borderRadius.default};
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .board-title,
  .board-info {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: left;
  }

  .board-content {
    width: 100%;
    display: flex;
    flex-direction: column;

    .board-title > h1 {
      margin: 0.3rem 0;
    }
    .comment-container {
      display: flex;
      align-items: center;
      text-align: center;
      gap: 0.2rem;

      .comment-icon {
        margin-bottom: 0.2rem;
      }
    }

    .board-info,
    .comment-container {
      font-size: ${({ theme }) => theme.fontSize.xsmall};
    }
  }
`;

export default BoardCard;
