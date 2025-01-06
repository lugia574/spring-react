export interface Post {
  boardNumber: number;
  title: string;
  content: string;
  favoriteCount: number;
  commentCount: number;
  viewCount: number;
  writerEmail: string;
  writerDatetime: string;
}

export interface PostList {
  posts: Post[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  totalItems: number;
}
