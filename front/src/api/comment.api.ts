import { Comment } from "../model/Comment.model";
import { httpClient } from "./http";

export const getCommentList = async (postId: number) => {
  try {
    const { data } = await httpClient.get<Comment[]>(`/comments/${postId}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postCommentApi = async (comment: Comment) => {
  const response = await httpClient.post(`/comments`, comment);
  return response;
};

export const deleteCommentApi = async (commentId: number) => {
  const response = await httpClient.delete(`/comments/${commentId}`);
  return response;
};
