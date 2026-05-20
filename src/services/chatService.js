import { apiFetch } from "../utils/api";

const getOnlineUsers = async () => {
    const res = await apiFetch("/chat/users");
    if (!res.ok) throw new Error("Failed to fetch online users");
    return res.json();
};

const getGroups = async () => {
    const res = await apiFetch("/chat/groups");
    if (!res.ok) throw new Error("Failed to fetch groups");
    return res.json();
};

const getGroupMembers = async (groupName) => {
    const res = await apiFetch(`/chat/groups/${groupName}/members`);
    if (!res.ok) throw new Error("Failed to fetch group members");
    return res.json();
};

const getPrivateMessages = async (userId, { limit = 50, before } = {}) => {
    const params = new URLSearchParams({ limit });
    if (before) params.append("before", before);
    const res = await apiFetch(`/chat/messages/private/${userId}?${params}`);

    if (!res.ok) throw new Error("Failed to fetch private messages");
    return res.json();
};

const getGroupMessages = async (groupName, { limit = 50, before } = {}) => {
    const params = new URLSearchParams({ limit });
    if (before) params.append("before", before);
    const res = await apiFetch(`/chat/messages/group/${groupName}?${params}`);
    if (!res.ok) throw new Error("Failed to fetch group messages");
    return res.json();
};

export {
    getOnlineUsers,
    getGroups,
    getGroupMembers,
    getPrivateMessages,
    getGroupMessages,
};
