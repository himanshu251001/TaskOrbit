import { useNavigate } from "react-router-dom";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects, fetchProjectMember } from "../services/projectsService";

export default function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await getProjects();
        data.map(async project => {
          project.team = await fetchProjectMember(project.id);
        })
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
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

      {projects.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <span className="text-base-content/50">No projects found</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card w-full sm:w-60 bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate(`/projects/${project.id}`, { state: { project } })}
            >
              <div className="card-body">
                <h2 className="card-title">{project.name}</h2>
                <p>Status: {project.status}</p>
              </div>
            </div>
          ))}
        </div>)}
    </div>
  );
}
