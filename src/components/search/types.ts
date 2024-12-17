import { Posts } from "../users/types";

export type PostsSearchPayload = {
  page: number;
  value: string;
  sort?: string;
};

export type PostsSearchResponse = {
  posts: Posts;
  total_pages: number;
  current_page: number;
  total_results: number;
};
