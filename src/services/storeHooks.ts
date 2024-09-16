import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextProps } from "./AuthContext";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
