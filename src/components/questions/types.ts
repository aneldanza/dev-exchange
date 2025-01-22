import { RawTagData } from "../tags/types";
import { AnswerData } from "../answers/types";
import { CommentData } from "../comments/types";
import { PostData } from "../posts/types";

export type QuestionsPageResponse = {
  questions: PostData[];
  total_results: number;
  total_pages: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  first_page: boolean;
  last_page: boolean;
};

export type QuestionPagePayload = {
  page: number;
  limit?: number;
  sort?: string;
};

export type QuestionData = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  tags: RawTagData[];
  user: {
    id: number | null;
    username: string | null;
  };
  answers: AnswerData[];
  comments: CommentData[];
  votes: number;
};

export type Option = { label: string; value: string };

export type FormValues = {
  title: string;
  body: string;
  tags: Option[];
};
