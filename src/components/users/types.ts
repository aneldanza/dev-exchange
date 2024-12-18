// import { LimitedQuestionData } from "../questions/types";
import { TagData } from "../tags/types";

export type VoteData = {
  id: number;
  user_id: number;
  votable_id: number;
  votable_type: string;
  value: number;
};

export type UserAnswerData = {
  title: string;
  question_id: number;
  tags: TagData[];
  created_at: string;
  updated_at: string;
  votes: number;
  id: number;
};

export type FullUserData = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  description: string;
  tags: TagData[];
  questions: PostData[];
  answers: PostData[];
  votes: VoteData[];
};

export interface UserInfoLimited {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  tags: TagData[];
}
export type PostData = {
  id: number;
  type: "Question" | "Answer";
  question_id: number | null;
  title: string;
  body?: string;
  tags: TagData[];
  votes: number;
  answers: number | null;
  user: {
    username: string | null;
    id: number | null;
  };
  created_at: string;
  updated_at: string;
};

export type Posts = PostData[];
