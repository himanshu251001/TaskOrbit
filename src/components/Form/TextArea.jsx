const TextArea = ({
    label,
    name,
    placeholder = "",
    rows = 4,
    required = false,
    defaultValue = "",
}) => {
    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text font-semibold pb-1">{label}</span>
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            <textarea
                name={name}
                placeholder={placeholder}
                rows={rows}
                required={required}
                defaultValue={defaultValue}
                className="textarea textarea-bordered w-full"
            />
        </div>
    );
};

export default TextArea;
