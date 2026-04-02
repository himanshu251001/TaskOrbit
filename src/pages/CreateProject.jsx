import Input from "../components/Form/Input";
import DateRange from "../components/Form/DateRange";
import MultiSelect from "../components/Form/MultiSelect";
import Range from "../components/Form/Range";
import FormCard from "../components/Form/FormCard";
import Actions from "../components/Form/Actions";
import TextArea from "../components/Form/TextArea";
import { useForm, FormProvider } from "react-hook-form";

export default function CreateProject() {
    const methods = useForm({
        defaultValues: {
            projectName: "",
            client: "",
            startDate: "",
            endDate: "",
            estimatedHours: "",
            budget: 0,
            users: [],
            description: "",
        },
    });

    const users = [
        "James P.",
        "Emma Wilson",
        "Sophia Turner",
        "Daniel Smith",
    ];

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="text-base-content/70">
                Fill in the details below to create a new project.
            </p>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormCard>
                        <Input
                            label="Project Name"
                            name="projectName"
                            required={true}
                        />

                        <div className="flex flex-col sm:flex-row gap-4">
                            <DateRange
                                title="Start Date"
                                name="startDate"
                            />
                            <DateRange
                                title="End Date"
                                name="endDate"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                                label="Client Name"
                                name="client"
                                required={true}
                            />

                            <MultiSelect
                                label="Users"
                                name="users"
                                options={users}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <div className="w-full flex flex-col justify-center ">
                                <Range
                                    label="Budget"
                                    name="budget"
                                    min={0}
                                    max={100000}
                                    step={1000}
                                />
                            </div>

                            <Input
                                label="Estimated Hours"
                                name="estimatedHours"
                                type="number"
                                required={true}
                            />
                        </div>
                        <TextArea
                            label="Project Description"
                            name="description"
                            placeholder="Enter project details..."
                            rows={5}
                            required={true}
                        />
                        <Actions />
                    </FormCard>
                </form>
            </FormProvider>
        </div>
    );
}
