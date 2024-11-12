import { QuestionData } from "../questions/types";
import { TagData } from "../tags/types";

export type VoteData = {
  id: number;
  user_id: number;
  votable_id: number;
  votable_type: string;
  value: number;
};

export type FullUserData = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  description: string;
  tags: TagData[];
  questions: QuestionData[];
  answers: {
    question_title: string;
    question_id: number;
    tags: TagData[];
    creeated_at: string;
    votes: number;
  };
  votes: VoteData[];
};

export interface UserInfoLimited {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  tags: {
    data: TagData[];
  };
}
