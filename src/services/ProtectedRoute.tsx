import { useAuth } from "./storeHooks"; // Assuming you have a custom hook to check authentication
import { SignInForm } from "../components/auth/SigninForm";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useAuth();
  return user ? element : <SignInForm />;
};
