import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPostDetail, getPosts } from "../api/post";

const isLastPage = (totalCnt: number, pages: number) => {
  return totalCnt === 0 || Math.ceil(totalCnt / 10) === pages;
};

export const usePost = () => {
  const {
    data,
    isLoading: isPostLoading,
    refetch: postsRefetch,
    fetchNextPage: nextPosts,
    hasNextPage: hasNextPosts,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam),
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

export const usePostDetail = (postId: number | undefined) => {
  if (postId === undefined)
    throw new Error("param error: postId is not number.");
  const { data, isLoading, error } = useQuery({
    queryKey: ["postDetail"],
    queryFn: () => getPostDetail(postId),
  });

  if (data === undefined) throw new Error("post error: post does not exist.");
  return { data, isLoading, error };
};
