import { apiFetch } from "../utils/api";
import { setAccessToken, clearAccessToken } from "./auth";
const handleImpersonate = async (userId, currentUser) => {
    if (userId === currentUser?.id) {
        alert("You cannot impersonate yourself.");
        return;
    }
    try {
        const res = await apiFetch("/auth/impersonate", {
            method: "POST",
            body: JSON.stringify({ targetUserId: userId }),
        });
        if (res?.ok) {
            const data = await res.json();
            if (data.accessToken) {
                setAccessToken(data.accessToken);
                window.location.reload();
            }
        } else {
            alert("Failed to impersonate user. Ensure you have the right privileges.");
        }
    } catch (err) {
        console.error(err);
        alert("Error impersonating user.");
    }
};

const handleRevert = async () => {
    const res = await apiFetch("/auth/stopImpersonation", {
        method: "POST",
    });
    if (res?.ok) {
        const data = await res.json();
        setAccessToken(data.accessToken);
        window.location.reload();
    } else {
        alert("Failed to revert impersonation.");
    }
};

const handleLogout = async () => {
    try {
        const res = await apiFetch("/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        if (res?.ok) {
            clearAccessToken();
        }
    } catch {
        alert("Failed to logout.");
    }
    window.location.href = "/";
}
const updateUserProfile = async (userId, data) => {
    const res = await apiFetch(`/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res?.ok) {
        throw new Error("Failed to update profile");
    }
    return res.json();
}
const getMembers = async () => {
    const res = await apiFetch("/users/members");
    if (!res?.ok) {
        throw new Error("Failed to fetch members");
    }
    return res.json();
};
const getOrgMembers = async () => {
    const res = await apiFetch("/users/org-members");
    if (!res?.ok) {
        throw new Error("Failed to fetch members");
    }
    return res.json();
};

export { handleImpersonate, handleRevert, handleLogout, getMembers, getOrgMembers, updateUserProfile };