import { getAccessToken, setAccessToken } from "../services/auth";


const BASE_URL = `http://${import.meta.env.VITE_API_URL || "localhost:3000"}`;

export async function apiFetch(path, options = {}) {
    const url = `${BASE_URL}${path}`;

    let token = await getValidToken();

    if (!token) {
        redirectToLogin();
        return new Response(JSON.stringify({ error: "Authentication token missing" }), {
            status: 401,
            statusText: "Unauthorized",
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        let res = await fetch(url, {
            ...options,
            credentials: "include",
            headers: buildHeaders(token, options.headers),
        });

        if (res.status === 401) {
            const newToken = await handleRefresh();

            if (!newToken) {
                redirectToLogin();
                return res;
            }

            return fetch(url, {
                ...options,
                credentials: "include",
                headers: buildHeaders(newToken, options.headers),
            });
        }
        if (res.status === 403) {
            redirectToForbidden();
        }

        return res;

    } catch (error) {
        console.error("Network error:", error);
        throw error;
    }
}

export async function handleRefresh() {
    try {
        const res = await fetch(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) return null;

        const data = await res.json();
        const token = data?.accessToken;

        if (!token) return null;

        setAccessToken(token);
        return token;
    } catch (err) {
        return null;
    }
}

export async function getValidToken() {
    const token = getAccessToken();
    if (token) return token;
    return await handleRefresh();
}

export function redirectToLogin() {
    setAccessToken(null);
    if (window.location.pathname !== "/login") {
        window.location.href = "/login";
    }
}

export function buildHeaders(token, extraHeaders = {}) {
    return {
        "Content-Type": "application/json",
        ...extraHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

export function redirectToForbidden() {
    window.location.href = "/forbidden";
}

