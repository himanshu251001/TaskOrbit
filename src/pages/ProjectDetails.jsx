import { useParams } from "react-router-dom";
import { stack } from "../data/constant";
import {
    Info,
    Trash2,
    Send,
    Pencil,
    Building2,
    HandCoins,
    CalendarFold,
} from "lucide-react";


const ProjectHeader = ({ project }) => {
    const statusColors = {
        "Pending": "badge-error text-error-content",
        "In Progress": "badge-warning text-warning-content",
        "Completed": "badge-success text-success-content",
    };

    return (
        <div >
            <h1 className="text-xl sm:text-2xl font-bold py-2">{project.name}</h1>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-2">
                <span
                    className={`badge badge-lg p-2 self-start ${statusColors[project.status] || "badge-neutral"
                        }`}
                >
                    <Info className="w-4 h-4 mr-2" />
                    {project.status}
                </span>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button className="btn btn-sm w-full sm:w-auto justify-center btn-error text-error-content">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </button>
                    <button className="btn btn-sm w-full sm:w-auto justify-center btn-primary text-primary-content">
                        <Send className="w-4 h-4 mr-2" /> Invite
                    </button>
                    <button className="btn btn-sm w-full sm:w-auto justify-center btn-info text-info-content">
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
                <InfoItem icon={<HandCoins className="w-4 h-4" />} label="Budget" value={`$${project.budget}`} />
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
            <progress
                className="progress progress-primary w-full sm:w-auto"
                value={progress}
                max="100"
            ></progress>
            <p className="text-sm mt-2">{progress}% completed</p>
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
                {technologies.map((tech, index) => {
                    const matched = stack.find((s) => {
                        const stackName = s.name.toLowerCase();
                        const techName = tech.name.toLowerCase();
                        return stackName.includes(techName) || techName.includes(stackName);
                    });

                    if (!matched?.logo) return null;

                    return (
                        <div
                            key={index}
                            className="tooltip tooltip-top"
                            data-tip={tech.name}
                        >
                            <div
                                className="w-16 h-16 p-4 rounded-full overflow-hidden bg-base-200 flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer"
                            >
                                <img
                                    src={matched.logo}
                                    alt={tech.name}
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
        <p className="font-medium pl-6">{value}</p>
    </div>
);


function ProjectDetails() {
    const { id } = useParams();

    const project = {
        id: 1,
        name: "Project Alpha",
        status: "In Progress",
        progress: 75,
        budget: 40000,
        client: "Google",
        dueDate: "04 September 2026",
        description:
            "This project focuses on building a scalable web-based project management system designed to improve team collaboration and productivity.",
        team: [
            {
                id: 1,
                name: "Jay Hargudson",
                role: "Project Manager",
                avatar: "https://i.pravatar.cc/150?img=11",
            },
            {
                id: 2,
                name: "Sophia Turner",
                role: "UI/UX Designer",
                avatar: "https://i.pravatar.cc/150?img=12",
            },
            {
                id: 3,
                name: "Michael Brown",
                role: "Frontend Developer",
                avatar: "https://i.pravatar.cc/150?img=13",
            },
            {
                id: 4,
                name: "Emma Wilson",
                role: "Backend Developer",
                avatar: "https://i.pravatar.cc/150?img=14",
            },
            {
                id: 5,
                name: "Daniel Smith",
                role: "DevOps Engineer",
                avatar: "https://i.pravatar.cc/150?img=15",
            },
            {
                id: 6,
                name: "Olivia Johnson",
                role: "QA Engineer",
                avatar: "https://i.pravatar.cc/150?img=16",
            },
            {
                id: 7,
                name: "Liam Martinez",
                role: "Product Owner",
                avatar: "https://i.pravatar.cc/150?img=17",
            },
            {
                id: 8,
                name: "Ava Anderson",
                role: "Scrum Master",
                avatar: "https://i.pravatar.cc/150?img=18",
            },
            {
                id: 9,
                name: "Noah Thompson",
                role: "Mobile Developer",
                avatar: "https://i.pravatar.cc/150?img=19",
            },
            {
                id: 10,
                name: "Isabella White",
                role: "Business Analyst",
                avatar: "https://i.pravatar.cc/150?img=20",
            },
        ],
        technologies: [
            { "name": "ReactJS" },
            { "name": "Angular" },
            { "name": "Node.js" },
            { "name": "Django" },
            { "name": "Ruby on Rails" },
            { "name": "Tailwind CSS" },
            { "name": "MySQL" },
            { "name": "MongoDB" },
            { "name": "Docker" },
            { "name": "Kubernetes" },
            { "name": "TensorFlow" },
            { "name": "Flutter" },
            { "name": "Blockchain" },
            { "name": "Quantum Computing" },
            { "name": "Edge AI" },
            { "name": "5G" },
            { "name": "Augmented Reality" }
        ]


    };

    if (!project) return <div className="p-6">Project not found</div>;

    return (
        <div className="space-y-6">
            <ProjectHeader project={project} />

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col gap-6 w-full lg:w-80">
                    <GeneralInfoCard project={project} />
                    <TeamCard team={project.team} />
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
