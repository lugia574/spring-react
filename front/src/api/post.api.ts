import { Post, PostList } from "../model/Post.model";
import { httpClient } from "./http";

export const getPosts = async (page: number) => {
  try {
    const { data } = await httpClient.get<PostList>(`/boards?pages=${page}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getTop5Post = async (): Promise<Post[]> => {
  const { data } = await httpClient.get<Post[]>("/boards/top5");
  return data;
};

export const deletePostApi = async (postId: number) => {
  const response = await httpClient.delete(`/boards/${postId}`);
  return response;
};

export const updatePostApi = async (postId: number, postData: PostData) => {
  const response = await httpClient.patch(`/boards/${postId}`, postData);
  return response;
};

export const getPostDetail = async (postId: number) => {
  const { data } = await httpClient.get<Post>(`/boards/${postId}`);
  return data;
};

export interface PostData {
  title: string;
  content: string;
}

export const postWritePost = async (postData: PostData) => {
  const response = await httpClient.post(`/boards`, postData);
  return response;
};
