import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "@/stores/useChat";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChat();

  if (!selectedUser) return null;

  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={selectedUser.imageUrl} />
          <AvatarFallback>{selectedUser.fullName}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">{selectedUser.fullName}</h2>
          <p className="text-sm text-zinc-400">
            {onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
