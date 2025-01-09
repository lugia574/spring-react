import { Post, PostList } from "../model/Post.model";
import { httpClient } from "./http";

interface GetPostsParams {
  page: number;
  searchType?: string;
  keyword?: string;
}

export const getPosts = async ({
  page = 1, // 기본값 설정
  searchType,
  keyword,
}: GetPostsParams) => {
  const params = new URLSearchParams({
    pages: String(page),
    ...(searchType && { searchType }),
    ...(keyword && { keyword }),
  });

  const { data } = await httpClient.get<PostList>(
    `/boards?${params.toString()}`
  );
  return data;
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
  const response = await httpClient.put(`/boards/${postId}`, postData);
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
