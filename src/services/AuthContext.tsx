import { createContext } from "react";
import { UserInfoLimited } from "../components/users/types";

export interface SignInInfo {
  message: string;
  data: {
    user: UserInfoLimited;
    token: string;
  };
  status: number;
}

export interface SignUpInfo {
  message: string;
  data: {
    user: UserInfoLimited;
    token: string;
  };
}

export interface AuthContextProps {
  user: UserInfoLimited | null;
  clearUser: () => void;
  registerUser: (user: UserInfoLimited, token: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  clearUser: () => {},
  registerUser: () => {},
});
