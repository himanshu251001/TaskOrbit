import { useFormContext } from "react-hook-form";

const Select = ({
    label,
    name,
    options,
    required = false,
}) => {
    const { register, formState: { errors } } = useFormContext();

    const getValue = (option) => option?.value ?? option;
    const getLabel = (option) => option?.label ?? option;

    return (
        <div className="form-control w-full ">
            <label className="label">
                <span className="label-text font-semibold pb-1">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </span>
            </label>

            <select
                className={`select select-bordered w-full bg-base-100 ${errors[name] ? "select-error" : ""}`}
                defaultValue=""
                {...register(name, { required: required ? `${label} is required` : false })}
            >
                <option value="" disabled>
                    Select {label}
                </option>

                {options.map((option) => {
                    const optionValue = getValue(option);
                    const optionLabel = getLabel(option);

                    return (
                        <option key={optionValue} value={optionValue}>
                            {optionLabel}
                        </option>
                    );
                })}
            </select>
            {errors[name] && (
                <span className="text-error text-sm mt-1">{errors[name].message}</span>
            )}
        </div>
    );
};

export default Select;