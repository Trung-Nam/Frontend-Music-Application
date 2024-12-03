import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Chat from "../pages/chat/Chat";
import AuthCallback from "../pages/auth-callback/AuthCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "@/layout/MainLayout";
import Album from "@/pages/album/Album";
import Admin from "@/pages/admin/Admin";
import NotFound from "@/pages/404/NotFound";

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
            element: <Home />,
          },
          {
            path: "/chat",
            element: <Chat />,
          },
          {
            path: "/albums/:albumId",
            element: <Album />,
          },
          {
            path: "/*",
            element: <NotFound />,
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
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

export default router;
