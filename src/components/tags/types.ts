import { PostData } from "../posts/types";

export type TagData = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  questions: PostData[];
};

export type LimitedTagData = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  questions: { id: number }[];
};

export type RawTagData = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
};
