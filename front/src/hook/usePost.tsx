import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getPostDetail,
  getPosts,
  getTop5Post,
  PostData,
  postWritePost,
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

  return { usePostDetail, useAllPost, uploadPost, useTop5Post };
};
