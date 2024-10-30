import { QuestionData } from "../questions/types";

export type TagData = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  questions: QuestionData[];
};
