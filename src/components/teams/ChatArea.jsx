import { useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import MessageBubble from "./MessageBubble";
import DateDivider from "./DateDivider";
import MessageInput from "./MessageInput";

/**
 * ChatArea — main conversation panel showing messages, date dividers,
 * the message input, and an empty-state placeholder.
 */
const ChatArea = ({ messages, channelName, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * Group consecutive messages under the same date header.
   * Returns an array of { date, messages[] } objects.
   */
  const groupedByDate = () => {
    if (!messages || messages.length === 0) return [];

    const groups = [];
    let currentDate = null;

    messages.forEach((msg) => {
      if (msg.date !== currentDate) {
        currentDate = msg.date;
        groups.push({ date: currentDate, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });

    return groups;
  };

  const dateGroups = groupedByDate();
  const isEmpty = dateGroups.length === 0;

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-base-100">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-base-content/40">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <MessageSquare size={28} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-base-content/60">
                No messages yet
              </p>
              <p className="text-sm mt-1">
                Start the conversation in{" "}
                <span className="font-semibold text-primary">
                  #{channelName}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <>
            {dateGroups.map((group, groupIdx) => (
              <div key={groupIdx}>
                <DateDivider date={group.date} />
                {group.messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <MessageInput channelName={channelName} onSend={onSendMessage} />
    </div>
  );
};

export default ChatArea;
