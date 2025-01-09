import { useQuery } from "@tanstack/react-query";
import { getCommentList, postCommentApi } from "../api/comment.api";
import { getEmail, getNickName } from "../stores/authStore";
import { Comment as IComment } from "../model/Comment.model";
// import { useNavigate } from "react-router-dom";

export const useCommentList = (
  postId?: string | undefined,
  userEmail?: string | undefined
) => {
  const { data, refetch: commentRefetch } = useQuery({
    queryKey: ["comments", postId, userEmail],
    queryFn: () => {
      if (!postId && !userEmail)
        throw new Error(`param error : posit id is not exist or not number`);
      return getCommentList({ postId, userEmail });
    },
  });
  const comments = data ? data : [];
  return { comments, commentRefetch };
};

export const useCommet = () => {
  const postComment = (content: string, postId: number) => {
    const comment: IComment = {
      boardNumber: postId,
      commentContent: content,
      userEmail: getEmail(),
      userNickname: getNickName(),
    };

    postCommentApi(comment);
  };

  return { postComment };
};
