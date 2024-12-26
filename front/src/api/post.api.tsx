import { Post, PostList } from "../model/Post.model";
import { httpClient } from "./http";

export const getPosts = async (page: number) => {
  console.log("실행");
  try {
    const { data } = await httpClient.get<PostList>(`/boards?pages=${page}`);
    console.log(data);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
    throw err;
    return {
      posts: [],
      pagination: {
        totalItems: 0,
        page: 1,
      },
    };
  }
};

export const getPostDetail = async (postId: number) => {
  try {
    const { data } = await httpClient.get<Post>(`/boards/:${postId}`);
    console.log(data);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};
