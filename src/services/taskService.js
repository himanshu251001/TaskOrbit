import { apiFetch } from "../utils/api";

const getTasks = async (options) => {
    const query = new URLSearchParams(options).toString();
    const res = await apiFetch(`/tasks/?${query}`);
    if (!res.ok) {
        throw new Error("Failed to fetch tasks");
    }
    const response = await res.json();
    return response;
};

const getTaskById = async (id) => {
    const res = await apiFetch(`/tasks/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch task");
    }
    const response = await res.json();
    return res?.data;
};

const createTask = async (task) => {
    const res = await apiFetch("/tasks", {
        method: "POST",
        body: JSON.stringify(task),
    });
    if (!res.ok) {
        throw new Error("Failed to create task");
    }
    const response = await res.json();
    return response?.data;
};

const updateTask = async (id, task) => {
    const res = await apiFetch(`/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify(task),
    });
    return res.json();
};

const deleteTask = async (id) => {
    const response = await apiFetch(`/tasks/${id}`, {
        method: "DELETE",
    });
    return response.json();
};
const fetchStatusOptions = async () => {
    const res = await apiFetch("/tasks/statuses");
    if (!res.ok) {
        throw new Error("Failed to fetch statuses");
    }
    return res.json();
};  

const fetchPriorityOptions = async () => {
    const res = await apiFetch("/tasks/priorities");
    if (!res.ok) {
        throw new Error("Failed to fetch priorities");
    }
    return res.json();
};

const fetchWorkTypeOptions = async () => {
    const res = await apiFetch("/tasks/work-types");
    if (!res.ok) {
        throw new Error("Failed to fetch work types");
    }
    return res.json();
};
const fetchStats = async () => {
    const res = await apiFetch("/tasks/stats");
    if (!res.ok) {
        throw new Error("Failed to fetch stats");
    }
    const response = await res.json();
    return response?.data || response;
};

const fetchWorkload = async () => {
    const res = await apiFetch("/tasks/workload");
    if (!res.ok) {
        throw new Error("Failed to fetch workload");
    }
    const response = await res.json();
    return response?.data || response;
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask, fetchStatusOptions, fetchPriorityOptions, fetchWorkTypeOptions, fetchStats, fetchWorkload };
