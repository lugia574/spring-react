import { Post, PostList } from "../model/Post.model";
import { httpClient } from "./http";

export const getPosts = async (page: number) => {
  try {
    const { data } = await httpClient.get<PostList>(`/boards?pages=${page}`);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPostDetail = async (postId: number) => {
  try {
    const { data } = await httpClient.get<Post>(`/boards/${postId}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export interface PostData {
  title: string;
  content: string;
}

export const postWritePost = async (postData: PostData) => {
  const response = await httpClient.post(`/boards`, postData);
  console.log(response);
  return response;
};
