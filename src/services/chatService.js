import { apiFetch } from "../utils/api";

const getOnlineUsers = async () => {
    const res = await apiFetch("/chat/users");
    if (!res?.ok) throw new Error("Failed to fetch online users");
    const response = await res.json();
    return response?.data || response;
};

const getGroups = async () => {
    const res = await apiFetch("/chat/groups");
    if (!res?.ok) throw new Error("Failed to fetch groups");
    const response = await res.json();
    return response?.data || response;
};

const getGroupMembers = async (groupName) => {
    const res = await apiFetch(`/chat/groups/${groupName}/members`);
    if (!res?.ok) throw new Error("Failed to fetch group members");
    const response = await res.json();
    return response?.data || response;
};

const getPrivateMessages = async (userId, { limit = 50, before } = {}) => {
    const params = new URLSearchParams({ limit });
    if (before) params.append("before", before);
    const res = await apiFetch(`/chat/messages/private/${userId}?${params}`);

    if (!res?.ok) throw new Error("Failed to fetch private messages");
    const response = await res.json();
    return response?.data || response;
};

const getGroupMessages = async (groupName, { limit = 50, before } = {}) => {
    const params = new URLSearchParams({ limit });
    if (before) params.append("before", before);
    const res = await apiFetch(`/chat/messages/group/${groupName}?${params}`);
    if (!res?.ok) throw new Error("Failed to fetch group messages");
    const response = await res.json();
    return response?.data || response;
};

export {
    getOnlineUsers,
    getGroups,
    getGroupMembers,
    getPrivateMessages,
    getGroupMessages,
};
