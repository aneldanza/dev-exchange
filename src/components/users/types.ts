// import { LimitedQuestionData } from "../questions/types";
import { TagData } from "../tags/types";
import { PostData } from "../posts/types";

export type PostsByTag = {
  tag: TagData;
  posts: PostData[];
};

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
  posts_by_tag: PostsByTag[];
};

export interface UserInfoLimited {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  tags: TagData[];
}
