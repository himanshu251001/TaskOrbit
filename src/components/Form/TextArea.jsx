import { useFormContext } from "react-hook-form";

const TextArea = ({
    label = '',
    name = '',
    placeholder = "",
    rows = 4,
    required = false,
    disabled = false,
}) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-base-content/80" htmlFor={name}>
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            <textarea
                id={name}
                placeholder={placeholder}
                rows={rows}
                disabled={disabled}
                {...register(name, { required: required ? `${label} is required` : false })}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200
                    text-sm text-base-content bg-base-100 placeholder:text-base-content/40 resize-vertical
                    disabled:bg-base-200/50 disabled:cursor-not-allowed disabled:text-base-content/50
                    ${errors[name]
                        ? "border-error focus:border-error focus:ring-2 focus:ring-error/20"
                        : "border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }
                    focus:outline-none`}
            />
            {errors[name] && (
                <span className="text-error text-xs mt-0.5">{errors[name].message}</span>
            )}
        </div>
    );
};

export default TextArea;
