import { apiFetch, BASE_URL } from "../utils/api";
import { setAccessToken, clearAccessToken } from "./auth";
import { toast } from "react-hot-toast";

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
const loginWithMicrosoft = async () => {
    const res = await fetch(`${BASE_URL}/auth/microsoft/login`, {
        method: "GET",
        credentials: "include",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        throw new Error(data?.message || "Failed to login with Microsoft");
    }
    if (!data?.url) {
        throw new Error("Microsoft login URL missing from response");
    }
    window.location.href = data.url;
    return data;
};
const signUpWithMicrosoft = async (navigate) => {
    const res = await fetch(`${BASE_URL}/auth/microsoft/signup`, {
        method: "GET",
        credentials: "include",
    });
    const data = await res.json();
    if (res?.ok) {
        if (data?.url) {
            window.location.href = data.url;
        } else {
            navigate("/login");
        }
    }
    else {

        toast.error("Failed to signup with Microsoft");
    }
    return data;
};

const registerUser = async (formData) => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
    });
};
const registerOrg = async (formData) => {
    return fetch(`${BASE_URL}/auth/organization/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
    })
}

export { handleImpersonate, handleRevert, handleLogout, getMembers, getOrgMembers, updateUserProfile, loginWithMicrosoft, registerUser, signUpWithMicrosoft, registerOrg };