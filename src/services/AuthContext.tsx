import { createContext, useState, ReactNode, type FC, useEffect } from "react";
import { useGetCurrentUserQuery } from "./api";
import { FullUserData } from "../components/users/types";

export interface SignInInfo {
  message: string;
  data: FullUserData;
  status: number;
}

export interface SignUpInfo {
  message: string;
  data: FullUserData;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  user: FullUserData | null;
  setUser: React.Dispatch<React.SetStateAction<FullUserData | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FullUserData | null>(null);
  const { data, isError, isLoading, isSuccess, error } =
    useGetCurrentUserQuery("");

  useEffect(() => {
    console.log("fetching current user from the server! ");
    if (isSuccess) {
      console.log(`got user info: ${data}`);
      setUser(data.user);
    } else if (isError) {
      console.log(error);
    } else if (isLoading) {
      console.log("loading user info from the server ...");
    }
  }, [isSuccess, isError, isLoading, data, error]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
