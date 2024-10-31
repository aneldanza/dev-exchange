import { QuestionData } from "../questions/types";

export type TagData = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  questions: QuestionData[];
};
