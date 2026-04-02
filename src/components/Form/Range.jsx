import { useFormContext } from "react-hook-form";

const Range = ({
  label,
  name,
  min,
  max,
  step,
  required = false,
}) => {
  const { register, watch, formState: { errors } } = useFormContext();
  const currentValue = watch(name) ?? (min || 0);

  return (
    <div className={`form-control justify-center w-full`}>
      <div>
        <label className="label text-center">
          <span className="label-text font-semibold ">{label}</span>
          {required && <span className="text-error ml-1">*</span>}
          <span className="label-text-alt px-2"><strong>${currentValue}</strong></span>
        </label>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          {...register(name, { 
            required: required ? `${label} is required` : false,
            valueAsNumber: true 
          })}
          className="range range-xs w-full"
        />
        {errors[name] && (
          <span className="text-error text-sm mt-1">{errors[name].message}</span>
        )}
      </div>
    </div>
  );
}

export default Range;
