import Input from "../components/Form/Input";
import DateRange from "../components/Form/DateRange";
import MultiSelect from "../components/Form/MultiSelect";
import Range from "../components/Form/Range";
import FormCard from "../components/Form/FormCard";
import Actions from "../components/Form/Actions";
import TextArea from "../components/Form/TextArea";
import Select from "../components/Form/Select";
import { useForm, FormProvider } from "react-hook-form";
import { createProject, updateProject, fetchStatusOptions } from "../services/projectsService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ChevronRight, Clock, Building2 } from "lucide-react";
import { getOrgMembers } from "../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { stack } from "../data/constant";

export default function CreateProject() {
    const navigate = useNavigate();
    const location = useLocation();
    // projectId is only present when matched by /projects/:projectId/edit
    const { projectId } = useParams();
    const isEditMode = Boolean(projectId);
    const [statusOptions, setStatusOptions] = useState([]);

    // Flatten stack names for MultiSelect (value = name, label = name)
    const technologyOptions = stack.map((item) => ({
        id: item.name,
        name: item.name,
    }));

    const methods = useForm({
        defaultValues: {
            projectName: "",
            client: "",
            startDate: "",
            endDate: "",
            estimatedHours: "",
            budget: 12500,
            users: [],
            description: "",
            status: "",
            technologies: [],
        },
    });

    const [users, setUsers] = useState([]);

    // Fetch org members for the MultiSelect
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getOrgMembers();
            setUsers(users);
        };
        fetchUsers();
    }, []);

    // In edit mode, prefill the form using project data passed via router state.
    useEffect(() => {
        if (!isEditMode || !location.state?.project) return;

        const { project } = location.state;
        fetchProjectStatusOptions();
        methods.reset({
            projectName: project.name ?? "",
            client: project.client ?? "",
            startDate: project.StartDate
                ? project.StartDate.slice(0, 10)
                : "",
            endDate: project.EndDate
                ? project.EndDate.slice(0, 10)
                : project.DueDate
                    ? project.dueDate.slice(0, 10)
                    : "",
            estimatedHours: project.EstimatedHours ?? "",
            budget: project.Budget ?? project.Budget ?? 12500,
            users: project.ProjectMember?.map((m) => m.userId) ?? [],
            description: project.description ?? "",
            status: project.status,
            technologies: project.technologies ?? [],
        });
    }, [isEditMode]);

    const fetchProjectStatusOptions = async () => {
        const statusOptions = await fetchStatusOptions();
        setStatusOptions(statusOptions);
    };


    const onSubmit = async (data) => {
        try {
            if (isEditMode) {
                await updateProject(projectId, data);
                toast.success("Project updated successfully!");
            } else {
                await createProject(data);
                toast.success("Project created successfully!");
            }
            setTimeout(() => navigate("/projects"), 2000);
        } catch (error) {
            console.error(isEditMode ? "Error updating project:" : "Error creating project:", error);
            toast.error(isEditMode ? "Failed to update project." : "Failed to create project.");
        }
    };

    return (
        <div className="w-full">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 text-sm">
                <span
                    className="text-base-content/50 hover:text-primary cursor-pointer transition-colors"
                    onClick={() => navigate("/projects")}
                >
                    Projects
                </span>
                <ChevronRight size={14} className="text-base-content/30" />
                <span className="text-base-content font-semibold">
                    {isEditMode ? "Edit Project" : "Create New Project"}
                </span>
            </nav>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormCard
                        title={isEditMode ? "Edit Project" : "Create New Project"}
                        subtitle={
                            isEditMode
                                ? "Update the project details below."
                                : "Fill in the details below to initialize your new workspace and invite your team."
                        }
                        actions={
                            <Actions
                                submitLabel={isEditMode ? "Save Changes" : "Create Project"}
                                onCancel={() => navigate("/projects")}
                            />
                        }
                    >
                        <Input
                            label="Project Name"
                            name="projectName"
                            placeholder="e.g. Q4 Marketing Campaign Redesign"
                            required={true}
                        />

                        <div className="flex flex-col sm:flex-row gap-6">
                            <DateRange
                                title="Start Date"
                                name="startDate"
                                variant="start"
                            />
                            <DateRange
                                title="End Date"
                                name="endDate"
                                variant="end"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Input
                                label="Client Name"
                                name="client"
                                type="text"
                                placeholder="Client Name"
                                required={true}
                                icon={<Building2 size={18} />}
                            />

                            <MultiSelect
                                label="Team Members"
                                name="users"
                                options={users}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="w-full flex flex-col justify-center">
                                <Range
                                    label="Project Budget"
                                    name="budget"
                                    min={1000}
                                    max={50000}
                                    step={500}
                                    prefix="$"
                                />
                            </div>

                            <Input
                                label="Estimated Hours"
                                name="estimatedHours"
                                type="number"
                                placeholder="0"
                                required={true}
                                icon={<Clock size={18} />}
                            />
                        </div>

                        {/* ── Edit-only fields ── */}
                        {isEditMode && (
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Select
                                    label="Status"
                                    name="status"
                                    options={statusOptions}
                                    required={true}
                                />

                                <MultiSelect
                                    label="Technologies"
                                    name="technologies"
                                    options={technologyOptions}
                                />
                            </div>
                        )}

                        <TextArea
                            label="Project Description"
                            name="description"
                            placeholder="Describe the project goals, scope, and key deliverables..."
                            rows={4}
                            required={true}
                        />
                    </FormCard>
                </form>
            </FormProvider>
        </div>
    );
}
