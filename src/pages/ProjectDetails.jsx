import { useParams, useNavigate, useLocation } from "react-router-dom";
import { stack } from "../data/constant";
import { deleteProject } from "../services/projectsService";
import {
    Info,
    Trash2,
    Send,
    Pencil,
    Building2,
    HandCoins,
    CalendarFold,
} from "lucide-react";


const ProjectHeader = ({ project, onDelete, onEdit }) => {
    const statusColors = {
        "ACTIVE": "badge-success text-success-content",
        "PENDING": "badge-error text-error-content",
        "COMPLETED": "badge-success text-success-content",
        "IN PROGRESS": "badge-warning text-warning-content",
    };

    return (
        <div >
            <h1 className="text-xl sm:text-2xl font-bold py-2">{project.name}</h1>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-2">
                <span
                    className={`badge badge-lg p-2 self-start ${statusColors[project.status] || "badge-neutral "
                        }`}
                >
                    <Info className="w-4 h-4 mr-2 " />
                    {project.status}
                </span>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button className="btn btn-sm w-full sm:w-auto justify-center btn-error text-error-content"
                        onClick={onDelete
                        }>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </button>
                    <button className="btn btn-sm w-full sm:w-auto justify-center btn-primary text-primary-content">
                        <Send className="w-4 h-4 mr-2" /> Invite
                    </button>
                    <button className="btn btn-sm w-full sm:w-auto justify-center btn-info text-info-content"
                        onClick={onEdit}>
                        <Pencil className="w-4 h-4 mr-2" /> Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

const GeneralInfoCard = ({ project }) => (
    <div className="card bg-base-100 shadow">
        <div className="card-body">
            <h2 className="card-title">General Information</h2>

            <div className="space-y-6 mt-4 max-h-50 overflow-y-auto">
                <InfoItem icon={<Building2 className="w-4 h-4" />} label="Client" value={project.client} />
                <InfoItem icon={<HandCoins className="w-4 h-4" />} label="Budget" value={`$${project.Budget}`} />
                <InfoItem icon={<CalendarFold className="w-4 h-4" />} label="Due Date" value={project.dueDate} />
            </div>
        </div>
    </div>
);

const TeamCard = ({ team }) => (
    <div className="card bg-base-100 shadow ">
        <div className="card-body">
            <h2 className="card-title">Teams</h2>

            <div className="space-y-3 mt-4 max-h-50 overflow-y-auto">
                {team.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={member.avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <p className="font-medium truncate">{member.name}</p>
                            <p className="text-xs opacity-60 truncate">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ProgressCard = ({ progress }) => (
    <div className="card bg-base-100 shadow min-h-30">
        <div className="card-body">
            <h2 className="card-title">Progress</h2>
            <div className="tooltip tooltip-top w-full" data-tip={`${progress || 0}%`}>
                <progress
                    className="progress progress-primary w-full"
                    value={progress}
                    max="100"
                ></progress>
            </div>

        </div>
    </div>
);

const DescriptionCard = ({ description }) => (
    <div className="card bg-base-100 shadow min-h-40">
        <div className="card-body">
            <h2 className="card-title">Description</h2>
            <p className="opacity-70 mt-2">{description}</p>
        </div>
    </div>
);

const Stack = ({ technologies }) => (
    <div className="card bg-base-100 shadow min-h-30">
        <div className="card-body">
            <h2 className="card-title text-xl">Tech Stack</h2>

            <div className="flex flex-wrap gap-4 mt-6">
                {technologies.map((technology, index) => {
                    const tech = technology.trim().toLowerCase();

                    const matched = stack.find((stackItem) => {
                        const stack = stackItem.name.trim().toLowerCase();

                        return (
                            stack.includes(tech)
                        );
                    });
                    if (!matched?.logo) return null;

                    return (
                        <div
                            key={index}
                            className="tooltip tooltip-top"
                            data-tip={tech}
                        >
                            <div
                                className="w-16 h-16 p-4 rounded-full overflow-hidden bg-base-200 flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer"
                            >
                                <img
                                    src={matched.logo}
                                    alt={tech}
                                    className="w-10 h-10 object-contain"
                                />
                            </div>
                        </div>

                    );
                })}
            </div>

        </div>
    </div>
);


const InfoItem = ({ icon, label, value }) => (
    <div>
        <div className="flex items-center gap-2 text-sm font-semibold opacity-70">
            {icon}
            {label}
        </div>
        {value && <p className="font-medium pl-6">{value}</p>}
        {!value && <p className="font-medium pl-6 opacity-50"> - </p>}
    </div>
);


function ProjectDetails() {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    const { project } = location.state || {};

    const handleDelete = async () => {
        if (!confirm("Delete this project?")) return;
        try {
            await deleteProject(id);
            navigate("/projects");
        } catch (err) {
            console.error("Error deleting project:", err);
        }
    };

    const handleEdit = () => {
        navigate(`/projects/${id}/edit`, { state: { project } });
    };

    if (!project) return <div className="p-6">Project not found</div>;

    return (
        <div className="space-y-6">
            <ProjectHeader project={project} onDelete={handleDelete} onEdit={handleEdit} />

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col gap-6 w-full lg:w-80">
                    <GeneralInfoCard project={project} />
                    <TeamCard team={project.team || []} />
                </div>

                <div className="flex-1 flex flex-col gap-6">
                    <ProgressCard progress={project.progress} />
                    <DescriptionCard description={project.description} />
                    <Stack technologies={project.technologies} />
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
