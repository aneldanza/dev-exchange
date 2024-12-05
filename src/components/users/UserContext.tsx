import { createContext } from "react";
import { FullUserData, UserAnswerData } from "./types";
import { TagData } from "../tags/types";
import { QuestionData } from "../questions/types";

interface UserContextProps {
  fullUserData: FullUserData | undefined;
  postsByTag: Record<
    string,
    { tag: TagData; posts: (QuestionData | UserAnswerData)[] }
  >;
  //   setFullUserData: React.Dispatch<React.SetStateAction<FullUserData | null>>;
}

export const UserContext = createContext<UserContextProps>({
  fullUserData: undefined,
  postsByTag: {},
  //   setFullUserData: () => {},
});
