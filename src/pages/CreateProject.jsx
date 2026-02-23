import { useState } from "react";
import Input from "../components/Form/Input";
import DateRange from "../components/Form/DateRange";
import MultiSelect from "../components/Form/MultiSelect";
import Range from "../components/Form/Range";
import FormCard from "../components/Form/FormCard";
import Actions from "../components/Form/Actions";
import TextArea from "../components/Form/TextArea";


export default function CreateProject() {
    const [formData, setFormData] = useState({
        projectName: "",
        client: "",
        startDate: "",
        endDate: "",
        estimatedHours: "",
    });

    const [budget, setBudget] = useState(0);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const users = [
        "James P.",
        "Emma Wilson",
        "Sophia Turner",
        "Daniel Smith",
    ];

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const toggleUser = (user) => {
        setSelectedUsers((prev) =>
            prev.includes(user)
                ? prev.filter((u) => u !== user)
                : [...prev, user]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalData = {
            ...formData,
            budget,
            users: selectedUsers,
        };

        console.log("Submitted:", finalData);
    };


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="text-base-content/70">
                Fill in the details below to create a new project.
            </p>

            <form onSubmit={handleSubmit}>
                <FormCard>
                    <Input
                        label="Project Name"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        required={true}
                    />

                    <div className="flex flex-col sm:flex-row gap-4">
                        <DateRange
                            title={"Start Date"}
                            startDate={formData.startDate}
                            endDate={formData.endDate}
                            onChange={handleChange}
                        />
                        <DateRange
                            title={"End Date"}
                            startDate={formData.startDate}
                            endDate={formData.endDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Input
                            label="Client Name"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            required={true}
                        />

                        <MultiSelect
                            label="Users"
                            options={users}
                            selected={selectedUsers}
                            toggleOption={toggleUser}
                           
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="w-full flex flex-col justify-center ">
                            <Range
                                label="Budget"
                                value={budget}
                                min={0}
                                max={100000}
                                step={1000}
                                onChange={setBudget}
                            />
                        </div>

                        <Input
                            label="Estimated Hours"
                            name="estimatedHours"
                            type="number"
                            value={formData.estimatedHours}
                            onChange={handleChange}
                            width="w-1/2"
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
        </div>
    );
}
