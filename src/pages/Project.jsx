import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { apiFetch } from "../utils/api";
import { useEffect } from "react";

export default function Projects() {
  const navigate = useNavigate();

  const projects = [
    { id: 1, name: "Website Redesign", status: "In Progress" },
    { id: 2, name: "Mobile App", status: "Completed" },
    { id: 3, name: "Marketing Campaign", status: "Pending" },
    { id: 4, name: "Website Redesign", status: "In Progress" },
    { id: 5, name: "Mobile App", status: "Completed" },
    { id: 6, name: "Marketing Campaign", status: "Pending" },
  ];
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await apiFetch("/projects");
        const data = await res.json();
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    console.log(fetchProjects());
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          className="btn btn-primary btn-md w-full sm:w-auto"
          onClick={() => navigate("/projects/create")}
        >
          <Plus className="mr-2" /> Create Project
        </button>
      </div>

      <div className="flex flex-wrap gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="card w-full sm:w-60 bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <div className="card-body">
              <h2 className="card-title">{project.name}</h2>
              <p>Status: {project.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
