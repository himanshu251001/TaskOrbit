import { apiFetch } from "../utils/api";

const getProjects = async () => {
  const res = await apiFetch(`/projects`);
  if (!res?.ok) {
    throw new Error("Failed to fetch projects");
  }
  const response = await res.json();
  return response?.data || response;
};

const getProjectById = async (id) => {
  const res = await apiFetch(`/projects/${id}`);
  if (!res?.ok) {
    throw new Error("Failed to fetch project");
  }
  const response = await res.json();
  return response?.data || response;
};

const createProject = async (project) => {
  const res = await apiFetch(`/projects`, {
    method: "POST",
    body: JSON.stringify(project),
  });
  if (!res?.ok) {
    throw new Error("Failed to create project");
  }
  const response = await res.json();
  return response?.data || response;
};

const updateProject = async (id, project) => {
  const res = await apiFetch(`/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify(project),
  });
  if (!res?.ok) {
    throw new Error("Failed to update project");
  }
  const response = await res.json();
  return response?.data || response;
};

const deleteProject = async (id) => {
  const res = await apiFetch(`/projects/${id}`, {
    method: "DELETE",
  });
  if (!res?.ok) {
    throw new Error("Failed to delete project");
  }
  const response = await res.json().catch(() => ({}));
  return response?.data || response;
};

const fetchStatusOptions = async () => {
  const res = await apiFetch(`/projects/statusTypes`);
  if (!res?.ok) {
    throw new Error("Failed to fetch status options");
  }
  const response = await res.json();
  return response?.data || response;
};

const fetchProjectMember = async (id) => {
  const res = await apiFetch(`/projects/${id}/members`);
  if (!res?.ok) {
    throw new Error("Failed to fetch project members");
  }
  const response = await res.json();
  return response?.data || response;
}

export { getProjects, getProjectById, createProject, updateProject, deleteProject, fetchProjectMember, fetchStatusOptions };
