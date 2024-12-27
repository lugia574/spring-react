import { getCommentList } from "../api/comment.api";

export const useCommentList = async (postId: number | undefined) => {
  if (postId === undefined)
    throw new Error(`param error : posit id is not exist or not number`);
  const data = await getCommentList(postId);
  if (data === undefined)
    throw Error(`comment error : comments does not exist`);
  return data;
};
