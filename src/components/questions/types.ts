import { TagData } from "../tags/types";
import { AnswerData } from "../answers/types";
import { CommentData } from "../comments/types";

export type LimitedQuestionData = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  tags: TagData[];
};

export type QuestionData = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  tags: TagData[];
  user: {
    id: number;
    username: string;
  };
  answers: AnswerData[];
  comments: CommentData[];
};

export type Option = { label: string; value: string };

export type FormValues = {
  title: string;
  body: string;
  tags: Option[];
};
