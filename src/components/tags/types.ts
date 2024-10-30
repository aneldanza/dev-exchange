import { QuestionData } from "../questions/types";

export type Tag = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  questions: QuestionData[];
};
