import { io } from "socket.io-client";
import { getAccessToken } from "./auth";

const SOCKET_URL = `http://${import.meta.env.VITE_API_URL || "localhost:3000"}`;

let socket = null;

export function getSocket() {
    if (!socket) {
        socket = io(SOCKET_URL, {
            autoConnect: false,
            withCredentials: true,
            auth: {
                token: getAccessToken(),
            },
        });
    }
    return socket;
}

export function connectSocket(userId) {
    const s = getSocket();

    if (!s.connected) {
        s.connect();
    }

    s.emit("user:register", { userId });
    return s;
}

export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}

export function sendPrivateMessage(receiverId, message) {
    getSocket().emit("message:private", { receiverId, message });
}

export function sendGroupMessage(groupName, message) {
    getSocket().emit("message:group", { groupName, message });
}

export function joinGroup(groupName) {
    getSocket().emit("group:join", { groupName });
}

export function leaveGroup(groupName) {
    getSocket().emit("group:leave", { groupName });
}

export function createGroup(groupName) {
    getSocket().emit("group:create", { groupName });
}

export function onSocketEvent(event, callback) {
    getSocket().on(event, callback);
}

export function offSocketEvent(event, callback) {
    getSocket().off(event, callback);
}

/**
 * Register multiple events at once using an object mapping.
 * Returns a cleanup function that deregisters all of them.
 */
export function registerSocketEvents(handlers) {
    const s = getSocket();
    for (const [event, callback] of Object.entries(handlers)) {
        s.on(event, callback);
    }
    
    return () => {
        for (const [event, callback] of Object.entries(handlers)) {
            s.off(event, callback);
        }
    };
}
