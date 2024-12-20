import { createContext } from "react";
import { FullUserData } from "./types";

interface UserContextProps {
  fullUserData: FullUserData | undefined;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  //   setFullUserData: React.Dispatch<React.SetStateAction<FullUserData | null>>;
}

export const UserContext = createContext<UserContextProps>({
  fullUserData: undefined,
  activeTab: "activity",
  setActiveTab: () => {},
  //   setFullUserData: () => {},
});
