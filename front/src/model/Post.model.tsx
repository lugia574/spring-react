export interface Post {
  board_number: number;
  title: string;
  content: string;
  favorite_count: number;
  comment_count: number;
  view_count: number;
  writer_email: string;
  writer_datetime: string;
}

export interface PostList {
  posts: Post[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  totalItems: number;
}
