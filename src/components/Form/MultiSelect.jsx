import { useFormContext } from "react-hook-form";

const MultiSelect = ({
    label,
    name,
    options,
    required = false,
}) => {
    const { register, watch, formState: { errors } } = useFormContext();
    const selected = watch(name) || [];

    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text font-semibold pb-1">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </span>
            </label>

            <div className="dropdown w-full">
                <label tabIndex={0} className="btn bg-base-100 w-full justify-between">
                    <span className="label-text font-semibold">{selected.length > 0
                        ? `${selected.length} selected`
                        : `Select ${label}`}</span>
                </label>

                <ul className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-full border border-base-100 max-h-56 overflow-y-auto">
                    {options.map((option) => (
                        <li key={option}>
                            <label className="cursor-pointer flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={option}
                                    {...register(name, { 
                                        validate: (v) => !required || (v && v.length > 0) || `${label} is required` 
                                    })}
                                    className="checkbox checkbox-sm"
                                />
                                <span>{option}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            {errors[name] && (
                <span className="text-error text-sm mt-1">{errors[name].message}</span>
            )}
        </div>
    );
}

export default MultiSelect;
