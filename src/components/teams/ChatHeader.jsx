import { MessagesSquare, User,LayoutList} from "lucide-react";

/**
 * ChatHeader — displays the active channel/DM name with an icon
 * and a mobile sidebar toggle.
 */
const ChatHeader = ({ activeChannel, onToggleSidebar }) => {
  const isGroup = activeChannel?.type === "group";
  const capitalize = (str) => 
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const displayName = activeChannel 
    ? (isGroup ? capitalize(activeChannel.name) : activeChannel.name)
    : "Messages";

  return (
    <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-base-200 bg-base-100 shrink-0">
      {/* Mobile sidebar toggle */}
      <button
        id="teams-sidebar-toggle"
        onClick={onToggleSidebar}
        className="btn btn-ghost btn-square btn-sm md:hidden"
        aria-label="Toggle channels sidebar"
      >
        <LayoutList size={20} className="text-primary"/>
      </button>

      {/* Channel icon */}
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        {isGroup || !activeChannel ? (
          <MessagesSquare size={16} className="text-primary" />
        ) : (
          <User size={16} className="text-primary" />
        )}
      </div>

      {/* Channel name */}
      <div className="min-w-0">
        <h2 className="text-sm font-bold text-base-content truncate">
          {displayName}
        </h2>
        <p className="text-xs text-base-content/50">
          {!activeChannel ? "Select a conversation" : (isGroup ? "Group channel" : "Direct Message")}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
