import { RawTagData } from "../tags/types";

export type PostData = {
  id: number;
  type: "Question" | "Answer";
  question_id: number | null;
  accepted?: boolean;
  title: string;
  body: string;
  tags: RawTagData[];
  votes: number;
  answers?: { count: number; accepted: boolean };
  user: {
    username: string | null;
    id: number | null;
  };
  created_at: string;
  updated_at: string;
};

export type Posts = PostData[];
