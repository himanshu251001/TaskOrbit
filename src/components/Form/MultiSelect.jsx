const MultiSelect = ({
    label,
    options,
    selected,
    toggleOption,
    required = false,
}) => {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text font-semibold pb-1">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </span>
            </label>

            <div className="dropdown w-full">
                <label tabIndex={0} className="btn bg-white w-full justify-between">
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
                                    required={required}
                                    className="checkbox checkbox-sm"
                                    checked={selected.includes(option)}
                                    onChange={() => toggleOption(option)}
                                />
                                <span>{option}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MultiSelect;
