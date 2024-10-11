import { Navigate } from "react-router-dom";
import { useAuth } from "./storeHooks"; // Assuming you have a custom hook to check authentication

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};
