import { useState, useEffect, useCallback, useRef } from "react";
import { useUser } from "../context/UserContext";
import {
  connectSocket,
  disconnectSocket,
  sendPrivateMessage,
  sendGroupMessage,
  registerSocketEvents,
} from "../services/socketService";
import {
  getGroups,
  getOnlineUsers,
  getPrivateMessages,
  getGroupMessages,
} from "../services/chatService";
import ChannelSidebar from "../components/teams/ChannelSidebar";
import ChatArea from "../components/teams/ChatArea";
import ChatHeader from "../components/teams/ChatHeader";

/**
 * Teams Page — full-screen team chat interface with channel sidebar
 * and main conversation area.
 *
 * Layout:
 *  ┌──────────┬─────────────────────────┐
 *  │ Channel  │  ChatHeader             │
 *  │ Sidebar  ├─────────────────────────┤
 *  │          │  ChatArea (messages)     │
 *  │          │                         │
 *  │          ├─────────────────────────┤
 *  │          │  MessageInput           │
 *  └──────────┴─────────────────────────┘
 */
export default function Teams() {
  const { user } = useUser();

  const [groups, setGroups] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const activeChannelRef = useRef(activeChannel);
  activeChannelRef.current = activeChannel;

  // ── Connect socket + load sidebar data on mount ────────────
  useEffect(() => {
    if (!user?.id) return;

    connectSocket(user.id);

    const loadSidebarData = async () => {
      try {
        const [groupsRes, usersRes] = await Promise.all([
          getGroups(),
          getOnlineUsers(),
        ]);
        setGroups(groupsRes.groups || []);
        setOnlineUsers(usersRes.users || []);
      } catch (err) {
        console.error("Failed to load sidebar data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSidebarData();

    // ── Real-time socket listeners ─────────────────────────
    /*
    const handleUserOnline = ({ userId }) => {
      setOnlineUsers((prev) => {
        if (prev.some((u) => u.userId === userId)) return prev;
        return [...prev, { userId }];
      });
    };

    const handleUserOffline = ({ userId }) => {
      setOnlineUsers((prev) => prev.filter((u) => u.userId !== userId));
    };
    */

    const handlePrivateMessage = (payload) => {
      const current = activeChannelRef.current;
      if (current?.type === "dm" && current?.id === payload.from) {
        setMessages((prev) => [...prev, normalizeMessage(payload, false)]);
      }
    };

    const handleGroupMessage = (payload) => {
      const current = activeChannelRef.current;

      if (current?.type === "group" && current?.name === payload.groupName) {
        setMessages((prev) => [...prev, normalizeMessage(payload, false)]);
      }
    };

    const handleMessageSent = (payload) => {
      setMessages((prev) => [...prev, normalizeMessage(payload, true)]);
    };

    const handleGroupCreated = (group) => {
      setGroups((prev) => [...prev, group]);
    };

    const handleGroupUserJoined = ({ group }) => {
      setGroups((prev) => prev.map((g) => (g.id === group.id ? group : g)));
    };

    const handleGroupUserLeft = ({ group }) => {
      setGroups((prev) => prev.map((g) => (g.id === group.id ? group : g)));
    };

    const handleGroupJoined = (group) => {
      setGroups((prev) => {
        if (prev.some((g) => g.id === group.id)) return prev;
        return [...prev, group];
      });
    };

    const handleGroupLeft = ({ groupName }) => {
      setGroups((prev) => prev.filter((g) => g.name !== groupName));
      if (activeChannelRef.current?.name === groupName) {
        setActiveChannel(null); // Clear chat area if we leave the current group
      }
    };

    const handleSocketError = (payload) => {
      // payload usually has { type, event, message }
      console.error(`Socket Error:`, payload);
      alert(`Chat Error: ${payload.message}`); // Basic error feedback
    };

    const cleanupEvents = registerSocketEvents({
      // "user:online": handleUserOnline,
      // "user:offline": handleUserOffline,
      "message:private": handlePrivateMessage,
      "message:group": handleGroupMessage,
      "message:sent": handleMessageSent,
      "group:created": handleGroupCreated,
      "group:user-joined": handleGroupUserJoined,
      "group:user-left": handleGroupUserLeft,
      "group:joined": handleGroupJoined,
      "group:left": handleGroupLeft,
      "error": handleSocketError,
      "user:registered": () => console.log("Registered!"),
    });

    return () => {
      cleanupEvents();
      disconnectSocket();
    };
  }, [user?.id]);

  // ── Load messages when the active channel changes ──────────
  useEffect(() => {
    if (!activeChannel) {
      setMessages([]);
      return;
    }

    let cancelled = false;

    const loadMessages = async () => {
      try {
        let res;
        if (activeChannel.type === "dm") {
          res = await getPrivateMessages(activeChannel.id);
        } else {
          res = await getGroupMessages(activeChannel.name);
        }
        if (!cancelled) {
          const msgs = (res.messages || []).map((m) =>
            normalizeMessage(m, m.senderId === user?.id)
          );
          setMessages(msgs);
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
        if (!cancelled) setMessages([]);
      }
    };

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [activeChannel, user?.id]);

  // ── Send a message ─────────────────────────────────────────
  const handleSendMessage = useCallback(
    (text) => {
      if (!activeChannel || !text.trim()) return;

      if (activeChannel.type === "dm") {
        sendPrivateMessage(activeChannel.id, text);
      } else {
        sendGroupMessage(activeChannel.name, text);
      }
    },
    [activeChannel]
  );

  // ── Derived sidebar data ───────────────────────────────────

  const directMessages = onlineUsers.map((u) => ({
    id: u.id,
    name: u.name || `User ${u.userId}`,
    avatar: u.avatar || null,
    online: true,
  }));


  const sidebarGroups = groups.map((g) => ({
    id: g.id || g.name,
    name: g.name,
    unread: 0,
  }));

  const channelDisplayName =
    activeChannel?.type === "group"
      ? activeChannel.name
      : activeChannel?.name || "channel";

  if (loading) {
    return (
      <div
        className="flex items-center justify-center bg-base-100"
        style={{ height: "calc(100vh - 4.5rem)" }}
      >
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div
      className="flex bg-base-100 overflow-hidden md:border-none md:rounded-none md:shadow-none rounded-xl shadow-sm border border-base-200"
      style={{ height: "calc(100vh - 4.5rem)" }}
    >
      <ChannelSidebar
        groups={sidebarGroups}
        directMessages={directMessages}
        activeChannel={activeChannel}
        onSelectChannel={setActiveChannel}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <ChatHeader
          activeChannel={activeChannel}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <ChatArea
          messages={messages}
          channelName={channelDisplayName}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────

function normalizeMessage(raw, isOwn) {
  const timestamp = raw.timestamp || raw.createdAt;
  const date = timestamp ? new Date(timestamp) : new Date();

  return {
    id: raw.id || `msg-${Date.now()}-${Math.random()}`,
    text: raw.message || raw.content || "",
    sender: isOwn
      ? "You"
      : raw.sender?.name || raw.senderName || "Unknown",
    avatar: raw.sender?.avatar || null,
    time: date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    date: date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }),
    isOwn,
    reactions: [],
    attachment: null,
  };
}
