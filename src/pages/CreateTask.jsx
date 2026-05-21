import Input from "../components/Form/Input";
import DateRange from "../components/Form/DateRange";
import Select from "../components/Form/Select";
import FormCard from "../components/Form/FormCard";
import Actions from "../components/Form/Actions";
import TextArea from "../components/Form/TextArea";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { createTask, fetchPriorityOptions, fetchStatusOptions, fetchWorkTypeOptions } from "../services/taskService";
import { getProjects } from "../services/projectsService";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getMembers } from "../services/userService";

export default function CreateTask() {
    const navigate = useNavigate();
    const methods = useForm({
        defaultValues: {
            title: "",
            dueDate: "",
            description: "",
            workType: "",
            priority: "",
            assignToId: "",
            projectId: "",
        },
    });
    const [statusOptions, setStatusOptions] = useState([]);
    const [priorityOptions, setPriorityOptions] = useState([]);
    const [workTypeOptions, setWorkTypeOptions] = useState([]);
    const [teamOptions, setTeamOptions] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        loadStatusOptions();
        loadPriorityOptions();
        loadWorkTypeOptions();
        loadTeamOptions();
        loadProjects();
    }, []);

    const loadStatusOptions = async () => {
        const res = await fetchStatusOptions();
        setStatusOptions(res);
    };

    const loadPriorityOptions = async () => {
        const res = await fetchPriorityOptions();
        setPriorityOptions(res);
    };

    const loadWorkTypeOptions = async () => {
        const res = await fetchWorkTypeOptions();
        setWorkTypeOptions(res);
    };
    const loadTeamOptions = async () => {
        const res = await getMembers();
        setTeamOptions(res);
    };
    const loadProjects = async () => {
        const res = await getProjects();
        setProjects(res);
    };

    const onSubmit = (data) => {
        createTask(data).then(() => {
            toast.success("Task created successfully");
            navigate("/tasks");
        }).catch((error) => {
            toast.error("Failed to create task");
        });

    };

    return (
        <div className="w-full">
            {/* Breadcrumbs */}

            <nav className="flex items-center gap-2 mb-6 text-sm">
                <span
                    className="text-base-content/50 hover:text-primary cursor-pointer transition-colors"
                    onClick={() => navigate("/tasks")}
                >
                    Tasks
                </span>
                <ChevronRight size={14} className="text-base-content/30" />
                <span className="text-base-content font-semibold">Create New Task</span>
            </nav>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormCard
                        title="Create New Task"
                        subtitle="Fill in the details below to create a new task."
                        actions={<Actions submitLabel="Create Task" onCancel={() => navigate("/tasks")} />}
                    >
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Input
                                label="Title"
                                name="title"
                                required={true}
                            />
                            <Select
                                label="Work Type"
                                name="workType"
                                options={workTypeOptions}
                                required={true}
                            />
                            <Select
                                label="Project"
                                name="projectId"
                                options={projects}
                                required={true}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <DateRange
                                title="Due Date"
                                name="dueDate"
                            />

                            <Select
                                label="Priority"
                                name="priority"
                                options={priorityOptions}
                                required={true}
                            />

                            <Select
                                label="Assign To"
                                name="assignToId"
                                options={teamOptions}
                                required={true}
                            />
                        </div>

                        <TextArea
                            label="Task Description"
                            name="description"
                            placeholder="Enter task details..."
                            rows={6}
                            required={true}
                        />
                    </FormCard>
                </form>
            </FormProvider>
        </div>
    );
}
