import { useFormContext } from "react-hook-form";

const Range = ({
  label,
  name,
  min,
  max,
  step,
  prefix = "$",
  required = false,
}) => {
  const { register, watch, formState: { errors } } = useFormContext();
  const currentValue = watch(name) ?? (min || 0);

  const formatValue = (val) => {
    if (prefix === "$") {
      return `$${Number(val).toLocaleString()}`;
    }
    return `${prefix}${val}`;
  };

  const formatBound = (val) => {
    if (prefix === "$" && val >= 1000) {
      return `$${val / 1000}K`;
    }
    return `${prefix}${val}`;
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-base-content/80">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
        <span className="text-sm font-semibold text-primary">
          {formatValue(currentValue)}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        {...register(name, {
          required: required ? `${label} is required` : false,
          valueAsNumber: true,
        })}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary bg-base-300"
      />
      <div className="flex justify-between text-[10px] text-base-content/40 font-semibold tracking-wider">
        <span>{formatBound(min)}</span>
        <span>{formatBound(max)}</span>
      </div>

      {errors[name] && (
        <span className="text-error text-xs mt-0.5">{errors[name].message}</span>
      )}
    </div>
  );
};

export default Range;
