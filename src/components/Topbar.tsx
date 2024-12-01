import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";

const Topbar = () => {
  const isAdmin = false;
  const { signOut } = useAuth();

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75
    backdrop-blur-md z-10
    "
    >
      <div className="flex gap-2 items-center">Music Flow</div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className="flex items-center gap-2">
            <LayoutDashboardIcon className="size-4" />
            Admin Dashboard
          </Link>
        )}

        {/* Render Sign Out button when user is signed in */}
        <SignedIn>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </SignedIn>

        {/* Render Sign In options when user is signed out */}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
