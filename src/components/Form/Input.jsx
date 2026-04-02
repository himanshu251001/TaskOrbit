import { useFormContext } from "react-hook-form";

const Input = ({
  label = "",
  name = "",
  type = "text",
  placeholder = "",
  required = false,
}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className={`form-control w-full`}>
      <label className="label">
        <span className="label-text font-semibold pb-1">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required: required ? `${label} is required` : false })}
        className={`input input-bordered w-full ${errors[name] ? "input-error" : ""}`}
      />
      {errors[name] && (
        <span className="text-error text-sm mt-1">{errors[name].message}</span>
      )}
    </div>
  );
}
export default Input;