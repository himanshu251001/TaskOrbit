import { useFormContext } from "react-hook-form";
import { Calendar, CalendarCheck } from "lucide-react";

const DateRange = ({
    title,
    name,
    required = false,
    variant = "start",
}) => {
    const { register, formState: { errors } } = useFormContext();
    const Icon = variant === "end" ? CalendarCheck : Calendar;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {title && (
                <label className="text-sm font-medium text-base-content/80" htmlFor={name}>
                    {title}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none">
                    <Icon size={18} />
                </span>
                <input
                    id={name}
                    type="date"
                    {...register(name, { required: required ? `${title} is required` : false })}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
                        text-sm text-base-content bg-base-100
                        ${errors[name]
                            ? "border-error focus:border-error focus:ring-2 focus:ring-error/20"
                            : "border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }
                        focus:outline-none`}
                />
            </div>
            {errors[name] && (
                <span className="text-error text-xs mt-0.5">{errors[name].message}</span>
            )}
        </div>
    );
};

export default DateRange;
