import { apiFetch } from "../utils/api";

const getTasks = async (options) => {
    const query = new URLSearchParams(options).toString();
    const res = await apiFetch(`/tasks/?${query}`);
    if (!res.ok) {
        throw new Error("Failed to fetch tasks");
    }
    const response = await res.json();
    return response?.data;
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
        method: "PUT",
        body: JSON.stringify(task),
    });
    return response.json();
};

const deleteTask = async (id) => {
    const response = await apiFetch(`/tasks/${id}`, {
        method: "DELETE",
    });
    return response.json();
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
