import Input from "../components/Form/Input";
import DateRange from "../components/Form/DateRange";
import Select from "../components/Form/Select";
import FormCard from "../components/Form/FormCard";
import Actions from "../components/Form/Actions";
import TextArea from "../components/Form/TextArea";
import { priorityOptions } from "../data/constant";
import { workTypeOptions } from "../data/constant";
import { useForm, FormProvider } from "react-hook-form";

export default function CreateTask() {
    const methods = useForm({
        defaultValues: {
            title: "",
            dueDate: "",
            description: "",
            workType: "",
            priority: "",
            assignTo: "",
        },
    });

    const Team = [
        { label: "Himanshu", value: "himanshu" },
        { label: "Saurabh", value: "saurabh" },
        { label: "Krishna", value: "krishna" },
        { label: "Sai", value: "sai" },
    ];

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Create New Task</h1>
            <p className="text-base-content/70">
                Fill in the details below to create a new task.
            </p>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormCard>
                        <div className="flex flex-col sm:flex-row gap-4">
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
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <DateRange className="w-full"
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
                                name="assignTo"
                                options={Team}
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
                        <Actions />
                    </FormCard>
                </form>
            </FormProvider>
        </div>
    );
}
