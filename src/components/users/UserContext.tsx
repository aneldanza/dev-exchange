import { createContext } from "react";
import { FullUserData, PostData } from "./types";
import { TagData } from "../tags/types";
import { LimitedQuestionData } from "../questions/types";

export type PostsByTag = {
  tag: TagData;
  posts: (LimitedQuestionData | PostData)[];
};

interface UserContextProps {
  fullUserData: FullUserData | undefined;
  postsByTag: Record<string, PostsByTag>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  //   setFullUserData: React.Dispatch<React.SetStateAction<FullUserData | null>>;
}

export const UserContext = createContext<UserContextProps>({
  fullUserData: undefined,
  postsByTag: {},
  activeTab: "activity",
  setActiveTab: () => {},
  //   setFullUserData: () => {},
});
