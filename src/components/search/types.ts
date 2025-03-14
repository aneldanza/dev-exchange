export type SearchPayload = {
  page: number;
  value: string;
  sort?: string;
  limit?: number;
};

export type SearchResponse = {
  total_pages: number;
  current_page: number;
  total_results: number;
  next_page: number | null;
  prev_page: number | null;
  first_page: boolean;
  last_page: boolean;
};
