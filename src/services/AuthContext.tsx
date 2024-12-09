import { createContext } from "react";
import { UserInfoLimited } from "../components/users/types";

export interface SignInInfo {
  message: string;
  data: UserInfoLimited;
  status: number;
}

export interface SignUpInfo {
  message: string;
  data: UserInfoLimited;
}

export interface AuthContextProps {
  user: UserInfoLimited | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfoLimited | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});
