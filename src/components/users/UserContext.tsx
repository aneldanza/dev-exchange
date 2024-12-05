import { createContext } from "react";
import { FullUserData, UserAnswerData } from "./types";
import { TagData } from "../tags/types";
import { QuestionData } from "../questions/types";

export type PostsByTag = {
  tag: TagData;
  posts: (QuestionData | UserAnswerData)[];
};

interface UserContextProps {
  fullUserData: FullUserData | undefined;
  postsByTag: Record<string, PostsByTag>;
  //   setFullUserData: React.Dispatch<React.SetStateAction<FullUserData | null>>;
}

export const UserContext = createContext<UserContextProps>({
  fullUserData: undefined,
  postsByTag: {},
  //   setFullUserData: () => {},
});
