import { useFormContext, useWatch } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { UserPlus, X } from "lucide-react";

const MultiSelect = ({
    label,
    name,
    options,
    required = false,
}) => {
    const { control, setValue, register, getValues, formState: { errors } } = useFormContext();
    const selected = useWatch({ name, control }) || [];
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        register(name, { required: required ? `${label} is required` : false });
    }, [register, name, required, label]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getValue = (option) => option?.id ?? option;
    const getLabel = (option) => option?.name ?? option?.label ?? option;

    const toggleOption = (option) => {
        const currentSelected = getValues(name) || [];
        const optionId = getValue(option);
        const isSelected = currentSelected.some(s => String(s) === String(optionId));
        
        const updated = isSelected
            ? currentSelected.filter((s) => String(s) !== String(optionId))
            : [...currentSelected, optionId];

        setValue(name, updated, { 
            shouldValidate: true, 
            shouldDirty: true, 
            shouldTouch: true 
        });
    };

    const removeOption = (optionId) => {
        const currentSelected = getValues(name) || [];
        setValue(name, currentSelected.filter((s) => String(s) !== String(optionId)), { 
            shouldValidate: true, 
            shouldDirty: true, 
            shouldTouch: true 
        });
    };

    return (
        <div className="flex flex-col gap-1.5 w-full" ref={dropdownRef}>
            {label && (
                <label className="text-sm font-medium text-base-content/80">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                <div
                    className={`flex items-center min-h-[46px] rounded-lg border transition-all duration-200 bg-base-100 cursor-pointer
                        ${errors[name]
                            ? "border-error"
                            : "border-base-300 hover:border-base-content/30"
                        }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex flex-wrap gap-1.5 flex-1 px-3 py-1.5">
                        {selected.length > 0 ? (
                            selected.map((itemId) => {
                                const option = options.find(o => String(getValue(o)) === String(itemId));
                                const labelText = option ? getLabel(option) : itemId;
                                
                                return (
                                    <span
                                        key={itemId}
                                        className="inline-flex items-center gap-1 bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-1 rounded-full"
                                    >
                                        {labelText}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeOption(itemId);
                                            }}
                                            className="hover:text-error transition-colors ml-0.5"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                );
                            })
                        ) : (
                            <span className="text-sm text-base-content/40">Select {label?.toLowerCase()}...</span>
                        )}
                    </div>
                    <button
                        type="button"
                        className="p-2 mr-1 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    >
                        <UserPlus size={18} />
                    </button>
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <ul className="absolute z-10 mt-1 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                        {options.map((option) => {
                            const optionId = getValue(option);
                            const optionLabel = getLabel(option);
                            
                            return (
                                <li key={optionId}>
                                    <label
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-base-200 cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selected.some(s => String(s) === String(optionId))}
                                            onChange={() => toggleOption(option)}
                                            className="checkbox checkbox-sm checkbox-primary"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm text-base-content font-medium">{optionLabel}</span>
                                            {option.email && (
                                                <span className="text-[10px] text-base-content/50 uppercase tracking-wider">{option.email}</span>
                                            )}
                                        </div>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            {errors[name] && (
                <span className="text-error text-xs mt-0.5">{errors[name].message}</span>
            )}
        </div>
    );
};

export default MultiSelect;
