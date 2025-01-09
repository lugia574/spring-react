import { Comment } from "../model/Comment.model";
import { httpClient } from "./http";

interface getCommentParams {
  userEmail?: string;
  postId?: string;
}

export const getCommentList = async ({
  userEmail,
  postId,
}: getCommentParams) => {
  const params = new URLSearchParams({
    ...(userEmail && { userEmail }),
    ...(postId && { postId }),
  });
  const { data } = await httpClient.get(`/comments?${params.toString()}`);
  return data?.data;
};

export const postCommentApi = async (comment: Comment) => {
  const response = await httpClient.post(`/comments`, comment);
  return response;
};

export const deleteCommentApi = async (commentId: number) => {
  const response = await httpClient.delete(`/comments/${commentId}`);
  return response;
};
