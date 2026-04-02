import { useFormContext } from "react-hook-form";

const DateRange = ({
    title,
    name,
    required = false,
}) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="w-full ">
            <label className="label">
                <span className="label-text font-semibold pb-1">
                    {title}
                    {required && <span className="text-error ml-1">*</span>}
                </span>
            </label>
            <input
                type="date"
                {...register(name, { required: required ? `${title} is required` : false })}
                className={`input input-bordered w-full ${errors[name] ? "input-error" : ""}`}
            />
            {errors[name] && (
                <span className="text-error text-sm mt-1">{errors[name].message}</span>
            )}
        </div>
    );
}

export default DateRange;
