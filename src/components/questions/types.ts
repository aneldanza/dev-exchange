import { Tag } from "../tags/types";

export type QuestionData = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  tags: Tag[];
  user: {
    id: number;
    username: string;
  };
};
