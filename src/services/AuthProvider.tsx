import { useState, ReactNode, type FC, useEffect } from "react";
import { useGetCurrentUserQuery } from "./api";
import { UserInfoLimited } from "../components/users/types";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfoLimited | null>(null);
  const { data, isError, isLoading, isSuccess, error } =
    useGetCurrentUserQuery("");

  useEffect(() => {
    console.log("fetching current user from the server! ");
    if (isSuccess) {
      console.log(`got user info: ${JSON.stringify(data, null, 2)}`);
      setUser(data.user);
    } else if (isError) {
      console.log(error);
      setUser(null);
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
