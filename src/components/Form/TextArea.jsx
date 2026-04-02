import { useFormContext } from "react-hook-form";

const TextArea = ({
    label = '',
    name = '',
    placeholder = "",
    rows = 4,
    required = false,
}) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text font-semibold pb-1">{label}</span>
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            <textarea
                placeholder={placeholder}
                rows={rows}
                {...register(name, { required: required ? `${label} is required` : false })}
                className={`textarea textarea-bordered w-full ${errors[name] ? "textarea-error" : ""}`}
            />
            {errors[name] && (
                <span className="text-error text-sm mt-1">{errors[name].message}</span>
            )}
        </div>
    );
};

export default TextArea;
