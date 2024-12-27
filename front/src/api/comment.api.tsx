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
