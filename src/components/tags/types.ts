import { LimitedQuestionData } from "../questions/types";

export type TagData = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  questions: LimitedQuestionData[];
};

export type LimitedTagData = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  questions: { id: number }[];
};
