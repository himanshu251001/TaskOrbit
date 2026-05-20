import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Folder, Edit3, ChevronLeft } from "lucide-react";
import { toast } from "react-hot-toast";

import {
    getTaskById,
    updateTask,
    fetchPriorityOptions,
    fetchStatusOptions,
    fetchWorkTypeOptions
} from "../services/taskService";
import { getMembers } from "../services/userService";

import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import TextArea from "../components/Form/TextArea";


const INITIAL_OPTIONS = {
    status: [],
    priority: [],
    workType: [],
    members: []
};

const ViewField = ({ label, value, className = "", isTextArea = false }) => (
    <div className={`flex flex-col gap-1.5 w-full flex-1 ${className}`}>
        <label className="text-sm font-medium text-base-content/80">{label}</label>
        {isTextArea ? (
            <div className="w-full px-5 py-4 rounded-xl border border-base-300 bg-base-50 text-base-content/80 text-sm leading-relaxed whitespace-pre-wrap min-h-[120px]">
                {value || "No description provided."}
            </div>
        ) : (
            <div className="w-full px-5 py-3.5 rounded-xl border border-base-300 bg-base-50 text-base-content/80 text-sm font-semibold flex items-center min-h-[50px]">
                {value || "—"}
            </div>
        )}
    </div>
);

const TaskDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [task, setTask] = useState(location.state?.task || null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [options, setOptions] = useState(INITIAL_OPTIONS);

    const formMethods = useForm({
        defaultValues: {
            title: task?.title || "",
            description: task?.description || "",
            status: task?.status || "",
            priority: task?.priority || "",
            workType: task?.workType || "",
            dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "",
            assignToId: task?.assigned_to_id || "",
            assignToName: task?.assigned_to_name || "",
        }
    });


    const { reset, handleSubmit } = formMethods;

    const fetchOptions = useCallback(async () => {
        try {
            const [status, priority, workType, members] = await Promise.all([
                fetchStatusOptions(),
                fetchPriorityOptions(),
                fetchWorkTypeOptions(),
                getMembers()
            ]);
            setOptions({ status, priority, workType, members });
        } catch (error) {
            console.error("Failed to load form options:", error);
        }
    }, []);

    useEffect(() => {
        fetchOptions();
    }, [fetchOptions]);

    const handleSave = async (data) => {
        setSaving(true);
        try {
            await updateTask(id, data);
            toast.success("Task updated successfully");
            setIsEditing(false);
            navigate("/tasks");
        } catch (error) {
            toast.error("Failed to update task");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset();
    };

    const getOptionLabel = useCallback((type, value) => {

        if (!value) return "";
        const lookup = {
            status: options.status,
            priority: options.priority,
            workType: options.workType,
            assignToId: options.members,
        };
        const activeOptions = lookup[type] || [];
        const found = activeOptions.find(opt => String(opt.value ?? opt.name ?? opt.id) === String(value));
        return found ? (found.name ?? found.label ?? found) : value;
    }, [options]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="p-8 text-center bg-base-100 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-4">Task not found</h2>
                <button onClick={() => navigate("/tasks")} className="btn btn-primary btn-sm">
                    Back to Tasks
                </button>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-6">
                <div
                    onClick={() => navigate("/tasks")}
                    className="gap-2 font-bold cursor-pointer hover:text-primary transition-all duration-200"
                >
                    <div className="flex items-center gap-2"><ChevronLeft size={16} /> Back to Tasks</div>
                </div>

            </div>

            {/* Main Content Card */}
            <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
                {/* Context Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-base-300 bg-base-50/30">
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <Folder size={12} />
                            Project
                        </div>
                        <span className="font-bold text-base-content uppercase tracking-wider">
                            {task.project_name || "PROJECT NAME"}
                        </span>
                    </div>
                    {!isEditing && (
                        <div className="flex items-center gap-3 text-sm">
                            <div
                                onClick={() => setIsEditing(true)}
                                className="gap-2 hover:bg-base-200 hover:text-primary cursor-pointer p-2 rounded-full transition-all duration-200"
                            >
                                <Edit3 size={20} />
                            </div>

                        </div>
                    )}

                </div>

                <div className="p-8">
                    {!isEditing ? (
                        <div className="space-y-10 animate-in fade-in duration-300">
                            <ViewField label="Title" value={task.title} className="text-3xl" />

                            <div className="flex flex-col lg:flex-row gap-10">
                                <div className="flex-1 space-y-10">
                                    <ViewField label="Description" value={task.description} isTextArea />

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <ViewField label="Status" value={getOptionLabel('status', task.status)} />
                                        <ViewField label="Priority" value={getOptionLabel('priority', task.priority)} />
                                        <ViewField label="Work Type" value={getOptionLabel('workType', task.workType)} />
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/3 space-y-6 p-8 rounded-2xl border border-base-300 bg-base-200/30 h-fit">
                                    <ViewField label="Assigned To" value={getOptionLabel('assignToId', task?.assigned_to_name)} />
                                    <ViewField label="Due Date" value={task?.dueDate ? new Date(task.dueDate).toLocaleDateString("en-GB").replace(/\//g, "-") : ""} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <FormProvider {...formMethods}>
                            <form onSubmit={handleSubmit(handleSave)} className="space-y-10 animate-in fade-in duration-300">
                                <Input
                                    name="title"
                                    label="Task Title"
                                    placeholder="Enter task title"
                                    className="text-3xl font-bold"
                                    required
                                />

                                <div className="flex flex-col lg:flex-row gap-10">
                                    <div className="flex-1 space-y-10">
                                        <TextArea
                                            name="description"
                                            label="Description"
                                            placeholder="Enter task details..."
                                            rows={6}
                                        />

                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <div className="flex-1"><Select name="status" label="Status" options={options.status} /></div>
                                            <div className="flex-1"><Select name="priority" label="Priority" options={options.priority} /></div>
                                            <div className="flex-1"><Select name="workType" label="Work Type" options={options.workType} /></div>
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-1/3 space-y-6 p-8 rounded-2xl border border-base-300 bg-base-200/30 h-fit">
                                        <Select name="assignToId" label="Assigned To" options={options.members} />
                                        <Input name="dueDate" label="Due Date" type="date" />
                                    </div>
                                </div>

                                {/* Form Footer */}
                                <div className="flex justify-end gap-3 pt-8 border-t border-base-300">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="btn btn-ghost font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-10 font-bold shadow-lg shadow-primary/20"
                                        disabled={saving}
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
