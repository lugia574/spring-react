import { PostList } from "../model/Post.model";
import { httpClient } from "./http";

export const getPosts = async (page: number) => {
  console.log("실행");
  try {
    const { data } = await httpClient.get<PostList>(`/boards?pages=${page}`);
    console.log(data);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err, "에러로 빠진거냐 싶은데도 이게 이럼");
    return {
      posts: [],
      pagination: {
        totalItems: 0,
        page: 1,
      },
    };
  }
};

export const getPostDetail = async (post_id: number) => {
  try {
    const { data } = await httpClient.get(`/boards/${post_id}`);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
  }
};
