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

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("jwt_token");
  };

  const registerUser = (user: UserInfoLimited, token: string) => {
    setUser(user);
    localStorage.setItem("jwt_token", token);
  };

  useEffect(() => {
    console.log("fetching current user from the server! ");
    if (isSuccess) {
      console.log(`got user info: ${JSON.stringify(data, null, 2)}`);
      if (data.user == null) {
        clearUser();
      } else {
        setUser(data.user);
      }
    } else if (isError) {
      console.log(error);
      clearUser();
    } else if (isLoading) {
      console.log("loading user info from the server ...");
    }
  }, [isSuccess, isError, isLoading, data, error]);

  return (
    <AuthContext.Provider value={{ user, clearUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
