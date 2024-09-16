import { Tag } from "../tags/types";

export type FullUserData = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  tags: Tag[];
};
