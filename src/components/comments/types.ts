export type CommentData = {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
  commentable_id: number;
  commentable_type: string;
  user: {
    id: number | null;
    username: string | null;
  };
};
