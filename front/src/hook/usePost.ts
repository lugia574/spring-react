import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  deletePostApi,
  getPostDetail,
  getPosts,
  getTop5Post,
  PostData,
  postWritePost,
  updatePostApi,
} from "../api/post.api";
import { useNavigate } from "react-router-dom";
const isLastPage = (totalCnt: number, pages: number) => {
  return totalCnt === 0 || Math.ceil(totalCnt / 10) === pages;
};

export const usePost = () => {
  const navigate = useNavigate();

  const usePostDetail = (postId: number | undefined) => {
    return useQuery({
      queryKey: ["postDetail", postId],
      queryFn: () => {
        if (postId === undefined) {
          throw new Error("param error: postId is not exist or not number.");
        }
        return getPostDetail(postId);
      },
    });
  };

  const useTop5Post = () => {
    return useQuery({
      queryKey: ["top5Post"],
      queryFn: async () => {
        return await getTop5Post();
      },
    });
  };

  const useAllPost = () => {
    const {
      data,
      isLoading: isPostLoading,
      refetch: postsRefetch,
      fetchNextPage: nextPosts,
      hasNextPage: hasNextPosts,
    } = useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam }) => getPosts({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return isLastPage(
          lastPage.pagination.totalItems,
          lastPage.pagination.page
        )
          ? null
          : Number(lastPage.pagination.page) + 1;
      },
    });

    const posts = data ? data.pages.flatMap((page) => page.posts) : [];
    const postsPage = data ? data.pages[data.pages.length - 1].pagination : {};
    const isEmptyPosts = posts.length === 0;

    return {
      posts,
      postsPage,
      isEmptyPosts,
      isPostLoading,
      postsRefetch,
      nextPosts,
      hasNextPosts,
    };
  };

  const searchTypeMap: Record<string, string> = {
    제목: "title",
    내용: "content",
    닉네임: "writer",
  };

  const useSearchPost = (searchType: string, keyword: string) => {
    const {
      data,
      isLoading: isSearchLoading,
      refetch: searchRefetch,
      fetchNextPage: nextSearchPosts,
      hasNextPage: hasNextSearchPosts,
    } = useInfiniteQuery({
      queryKey: ["searchPosts", searchTypeMap[searchType], keyword],
      queryFn: ({ pageParam }) =>
        getPosts({ page: pageParam, searchType, keyword }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return isLastPage(
          lastPage.pagination.totalItems,
          lastPage.pagination.page
        )
          ? null
          : Number(lastPage.pagination.page) + 1;
      },
      enabled: !!keyword,
    });

    const searchData = data ? data.pages.flatMap((page) => page.posts) : [];
    const searchPage = data ? data.pages[data.pages.length - 1].pagination : {};
    const isEmptySearchPosts = searchData.length === 0;

    return {
      searchData,
      searchPage,
      isEmptySearchPosts,
      isSearchLoading,
      searchRefetch,
      nextSearchPosts,
      hasNextSearchPosts,
    };
  };

  const uploadPost = async (postData: PostData) => {
    if (postData.title === "" || postData.content === "")
      throw new Error("data error: title or content is not exist.");
    try {
      const response = await postWritePost(postData);
      if (response.status !== 200) {
        new Error("post upload error");
      }
      navigate("/");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const updatePost = async (postId: number, postData: PostData) => {
    if (postData.title === "" || postData.content === "")
      throw new Error("data error: title or content is not exist.");

    try {
      const res = await updatePostApi(postId, postData);
      if (res.status !== 202) return new Error("not accepted update");
      navigate(`/post/${postId}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const deletePost = async (postId: number) => {
    try {
      const res = await deletePostApi(postId);
      if (res.status !== 200) throw new Error("Maybe.. Internal Server Error");
      navigate("/");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return {
    usePostDetail,
    useAllPost,
    uploadPost,
    useTop5Post,
    deletePost,
    updatePost,
    useSearchPost,
  };
};
