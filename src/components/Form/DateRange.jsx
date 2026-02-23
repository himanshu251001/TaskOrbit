const DateRange = ({
    title,
    startDate,
    required = false,
    onChange,
}) => {
    return (
        <div className="w-full sm:w-1/2 ">
            <label className="label">
                <span className="label-text font-semibold pb-1">
                    {title}
                    {required && <span className="text-error ml-1">*</span>}
                </span>
            </label>
            <input
                type="date"
                value={startDate}
                required={required}
                onChange={(e) => onChange("startDate", e.target.value)}
                className="input input-bordered w-full"
            />
        </div>
    );
}

export default DateRange;
