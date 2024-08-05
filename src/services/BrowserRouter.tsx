import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SignUpForm } from "../components/auth/SignupForm";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/signup", element: <SignUpForm /> }],
  },
]);
