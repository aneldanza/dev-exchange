import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SignUpForm } from "../components/auth/SignupForm";
import { SignInForm } from "../components/auth/SigninForm";
import { TagsPage } from "../components/tags/TagsPage";
import { UserPage } from "../components/users/UserPage";
import { AllUsersPage } from "../components/users/AllUsersPage";
import AllQuestionsPage from "../components/questions/AllQuestionsPage";
import NewQuestionPage from "../components/questions/NewQuestionPage";
import QuestionPage from "../components/questions/QuestionPage";
import { ProtectedRoute } from "./ProtectedRoute";
import EditQuestionPage from "../components/questions/EditQuestionPage";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AllQuestionsPage /> },
      { path: "/signup", element: <SignUpForm /> },
      { path: "/login", element: <SignInForm /> },
      { path: "users", element: <AllUsersPage /> },
      { path: "users/:userId", element: <UserPage /> },
      { path: "/tags", element: <TagsPage /> },
      { path: "/questions", element: <AllQuestionsPage /> },
      { path: "/questions/:questionId", element: <QuestionPage /> },
      {
        path: "/questions/new",
        element: <ProtectedRoute element={<NewQuestionPage />} />,
      },
      {
        path: "/questions/:questionId/edit",
        element: <ProtectedRoute element={<EditQuestionPage />} />,
      },
    ],
  },
]);
