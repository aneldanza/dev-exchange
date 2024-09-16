import { createContext, useState, ReactNode, type FC, useEffect } from "react";
import { useGetCurrentUserQuery } from "./api";

export interface UserInfoLimited {
  username: string;
  email: string;
  id: number;
}

export interface SignInInfo {
  message: string;
  data: UserInfoLimited;
  status: number;
}

export interface SignUpInfo {
  message: string;
  data: UserInfoLimited;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  user: UserInfoLimited | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfoLimited | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfoLimited | null>(null);
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
