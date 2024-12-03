import { axiosInstance } from "@/lib/axios";
import { useAuth as useAuthClerk } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/stores/useAuth";
import { useChat } from "@/stores/useChat";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuthClerk();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuth();
  const { initSocket, disconnectSocket } = useChat();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        if (token) {
          await checkAdminStatus();
          // init socket
          if (userId) {
            initSocket(userId);
          }
        }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in auth provider");
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // clean up
    return () => {
      disconnectSocket();
    }
  }, [checkAdminStatus, disconnectSocket, getToken, initSocket, userId]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
