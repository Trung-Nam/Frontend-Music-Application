import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Chat from "../pages/chat/Chat";
import AuthCallback from "../pages/auth-callback/AuthCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "@/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "/chat",
            element: <Chat />
          },
        ],
      },
      {
        path: "/sso-callback",
        element: (
          <AuthenticateWithRedirectCallback
            signUpForceRedirectUrl={"/auth-callback"}
          />
        ),
      },
      {
        path: "/auth-callback",
        element: <AuthCallback />,
      },
    ],
  },
]);

export default router;
