import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label = "",
  name = "",
  type = "text",
  placeholder = "",
  required = false,
  icon = null,
  disabled = false,
  rules = {},
}) => {
  const { register, formState: { errors } } = useFormContext();
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-base-content/80" htmlFor={name}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name, { required: required ? `${typeof label === "string" ? label : "This field"} is required` : false, ...rules })}
          className={`w-full ${icon ? "pl-10" : "px-4"} ${isPassword ? "pr-11" : ""} py-3 rounded-lg border transition-all duration-200
            text-sm text-base-content bg-base-100 placeholder:text-base-content/40
            disabled:bg-base-200/50 disabled:cursor-not-allowed disabled:text-base-content/50
            ${errors[name]
              ? "border-error focus:border-error focus:ring-2 focus:ring-error/20"
              : "border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            }
            focus:outline-none`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary focus:outline-none cursor-pointer transition-colors"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
      {errors[name] && (
        <span className="text-error text-xs mt-0.5">{errors[name].message}</span>
      )}
    </div>
  );
};
export default Input;