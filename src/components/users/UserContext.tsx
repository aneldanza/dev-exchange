import { createContext } from "react";
import { FullUserData } from "./types";

interface UserContextProps {
  fullUserData: FullUserData | undefined;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextProps>({
  fullUserData: undefined,
  activeTab: "activity",
  setActiveTab: () => {},
});
