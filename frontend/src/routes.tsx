import App from "./App.tsx";
import CreateSessionPage from "./pages/CreateSessionPage.tsx";
import SessionListPage from "./pages/SessionListPage.tsx";
import SessionPage from "./pages/SessionPage";
import ErrorPage from "@/pages/ErrorPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import QuestionListPage from "@/pages/QuestionListPage.tsx";
import AuthCallbackPage from "@/pages/Login/AuthCallbackPage.tsx";

export const routes = [
  {
    element: <App />,
    path: "/",
  },

  {
    element: <SessionPage />,
    path: "/session/:sessionId",
  },
  {
    element: <SessionListPage />,
    path: "/sessions",
  },
  {
    element: <QuestionListPage />,
    path: "/questions",
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <AuthCallbackPage />,
    path: "/login/callback",
  },
  {
    element: <CreateSessionPage />,
    path: "/sessions/create",
  },
  {
    element: <ErrorPage />,
    path: "/*",
  },
];
