import { Tag } from "../tags/types";

export type FullUserData = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
};
