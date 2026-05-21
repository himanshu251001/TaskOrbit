import { FileText, Download } from "lucide-react";

/**
 * MessageBubble — renders a single chat message with avatar, timestamp,
 * reactions, and optional file attachment.
 */
const MessageBubble = ({ message }) => {
  const { text, sender, avatar, time, isOwn, reactions, attachment } = message;

  return (
    <div
      className={`flex gap-3 mb-4 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className="shrink-0 mt-1">
        {isOwn ? (
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-content font-bold text-sm">Y</span>
          </div>
        ) : avatar ? (
          <img
            src={avatar}
            alt={sender}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm uppercase">
            {sender ? sender.charAt(0) : "?"}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`flex flex-col max-w-[75%] sm:max-w-[65%] ${
          isOwn ? "items-end" : "items-start"
        }`}
      >
        {/* Sender name + time */}
        <div
          className={`flex items-center gap-2 mb-1 ${
            isOwn ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span className="text-sm font-semibold text-base-content">
            {sender}
          </span>
          <span className="text-xs text-base-content/40">{time}</span>
        </div>

        {/* Message bubble */}
        <div
          className={`
            px-4 py-2.5 rounded-2xl text-sm leading-relaxed
            ${
              isOwn
                ? "bg-primary text-primary-content rounded-br-md"
                : "bg-base-200 text-base-content rounded-bl-md"
            }
          `}
        >
          {text}
        </div>

        {/* File Attachment */}
        {attachment && (
          <div
            className={`
              mt-2 flex items-center gap-3 px-4 py-3 rounded-xl border border-base-300
              bg-base-100 w-full max-w-xs
              ${isOwn ? "self-end" : "self-start"}
            `}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-base-content truncate">
                {attachment.name}
              </p>
              <p className="text-xs text-base-content/50">
                {attachment.size} • {attachment.type}
              </p>
            </div>
            <button
              className="btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-primary"
              aria-label={`Download ${attachment.name}`}
            >
              <Download size={16} />
            </button>
          </div>
        )}


      </div>
    </div>
  );
};

export default MessageBubble;
