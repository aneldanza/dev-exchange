import { createContext, useContext, useState, ReactNode, type FC } from "react";

interface UserInfoLimited {
  username: string;
  email: string;
  id: number;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: UserInfoLimited | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfoLimited | null>>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfoLimited | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
