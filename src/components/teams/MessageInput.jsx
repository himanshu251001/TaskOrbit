import { useState } from "react";
import { AtSign, Paperclip, Send } from "lucide-react";

/**
 * MessageInput — chat message input bar with emoji, mentions,
 * attachment, and send button.
 */
const MessageInput = ({ channelName, onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend?.(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" border-base-200 bg-base-100 px-4 py-3"
    >
      <div
        className="flex items-center gap-2 bg-base-200/50 border border-base-300
                      rounded-xl px-3 py-2 focus-within:border-primary/40 transition-colors"
      >
        {/* Attachment */}
        <button
          type="button"
          className="btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-primary"
          aria-label="Add attachment"
        >
          <Paperclip size={18} />
        </button>

        {/* Text input */}
        <input
          id="teams-message-input"
          type="text"
          placeholder={`Message #${channelName || "channel"}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-sm
                     text-base-content placeholder:text-base-content/40"
          aria-label="Type a message"
        />

        {/* Mention */}
        <button
          type="button"
          className="btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-primary"
          aria-label="Mention someone"
        >
          <AtSign size={18} />
        </button>

        {/* Send */}
        <button
          type="submit"
          disabled={!message.trim()}
          className={`
            btn btn-circle btn-sm transition-all duration-200
            ${
              message.trim()
                ? "bg-primary text-primary-content hover:bg-primary/90 shadow-sm"
                : "bg-base-300 text-base-content/30 cursor-not-allowed"
            }
          `}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
