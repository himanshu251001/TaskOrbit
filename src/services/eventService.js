import { apiFetch } from "../utils/api";

const getAllEvents = async (month, year) => {
    const query = new URLSearchParams({ month, year }).toString();
    const res = await apiFetch(`/events?${query}`);
    if (!res?.ok) {
        throw new Error("Failed to fetch events");
    }
    const response = await res.json();
    return response?.data || response;
};

const getUpcomingEvents = async () => {
    const res = await apiFetch("/events/upcoming");
    if (!res?.ok) {
        throw new Error("Failed to fetch upcoming events");
    }
    const response = await res.json();
    return response?.data || response;
};

const getEventById = async (id) => {
    const res = await apiFetch(`/events/${id}`);
    if (!res?.ok) {
        throw new Error("Failed to fetch event");
    }
    const response = await res.json();
    return response?.data || response;
};

const createEvent = async (eventData) => {
    const res = await apiFetch("/events", {
        method: "POST",
        body: JSON.stringify(eventData),
    });
    if (!res?.ok) {
        throw new Error("Failed to create event");
    }
    const response = await res.json();
    return response?.data || response;
};

const updateEvent = async (id, eventData) => {
    const res = await apiFetch(`/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(eventData),
    });
    if (!res?.ok) {
        throw new Error("Failed to update event");
    }
    const response = await res.json();
    return response?.data || response;
};

const getEventsType = async () => {
    const res = await apiFetch("/events/types");
    if (!res?.ok) {
        throw new Error("Failed to fetch events type");
    }
    const response = await res.json();
    return response?.data || response;
};  

export {
    getAllEvents,
    getUpcomingEvents,
    getEventById,
    createEvent,
    updateEvent,
    getEventsType
};
